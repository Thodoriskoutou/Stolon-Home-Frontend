<script lang="ts">
    import { page } from "$app/state";
    import { languages } from "$lib/constants";
    import Icon from "@iconify/svelte";
    import ChatArea from "$lib/ChatArea.svelte";

    let { data, children } = $props();

    // State
    let activeMenu = $state(true);
    let theme = $state("light");

    // Derived
    let language = $derived(data.lang);
    let translations = $derived((data as any).translations);
    const activeLanguages = languages.filter(l => Object.keys(translations).includes(l.key));
    
    let nextLanguage = $derived(activeLanguages.find(l => l.key != data.lang));
    let nextLanguageUrl = $derived.by(() => {
        if (!nextLanguage) return "#";
        const parts = page.url.pathname.split('/').filter(Boolean);
        parts.shift();
        parts.unshift(nextLanguage.key);
        return "/" + parts.join('/');
    });
    let menuItems = $derived([
        ...(data.menu?.nav_items || []),
        {
            nav_link: {
                url: `/${language}/about`,
                label: language === 'el' ? 'Σχετικά' : 'About',
                icon: "material-symbols:info-outline"
            }
        }
    ]);
    let footerCopyright = $derived(data.footer?.copyright || "");

    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        theme = newTheme;
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    $effect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        if (theme !== savedTheme) {
            theme = savedTheme;
            document.documentElement.setAttribute("data-theme", theme);
        }
    });
    
    let chatView = $derived(page.route.id === "/[lang]/(general)" ? "full" : "floating");
    // Translations and chat service are already in layout's data or provided by sub-pages.
    // However, chatService is currently created in +page.ts for the home page.
    // I should move it to +layout.ts if I want it globally available.
    // Let's check if +layout.ts exists or create it.
</script>

<div class="layout-wrapper">
    <!-- Floating Burger Button -->
    <button
        class="burger-float"
        onclick={() => activeMenu = !activeMenu}
        aria-label="Toggle menu"
    >
        <Icon
            icon={activeMenu ? "ci:close-md" : "ci:hamburger-md"}
            width="32"
            height="32"
        />
    </button>
    
    <img class="logo-float" src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"} alt={translations[language].general.name} />

    <!-- Drawer / Sidebar -->
    <div class="drawer">
        <aside class="sidebar" class:active={activeMenu}>
            <div class="sidebar-logo">
                <a href={`/${language}`}>
                    <img src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"} alt={translations[language].general.name} />
                </a>
            </div>
            <ul class="menu">
                {#each menuItems as item}
                <li>
                    <a
                        href={item.nav_link.url}
                        class="menu-link"
                        onclick={() => {
                            if (window.innerWidth <= 900) activeMenu = false;
                        }}
                    >
                        <div class="menu-item">
                            {#if item.nav_link.icon}
                                <Icon
                                    icon={item.nav_link.icon}
                                    width="24"
                                    height="24"
                                />
                            {/if}
                            {item.nav_link.label}
                        </div>
                    </a>
                </li>
                {/each}
            </ul>

            <!-- Cards in Sidebar -->
            {#if data.records && data.records.length > 0}
            <div class="sidebar-cards mobile-only-cards">
                {#each data.records as card}
                    <a href={card.link} target="_blank" class="mini-card sidebar-card">
                        <div class="mc-img-wrapper">
                            <img src={card.image} alt={card.title} />
                        </div>
                        <div class="mc-info">
                            <h4>{card.title}</h4>
                            <div class="mc-price-row">
                                <span class="mc-label">{card.label}</span>
                                <span class="mc-price">{card.price}</span>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
            {/if}

            <div class="drawer-footer">
                <button
                    class="theme-toggle"
                    onclick={toggleTheme}
                    aria-label={translations[language].sidebar[`theme_${theme}`]}
                    title={translations[language].sidebar[`theme_${theme}`]}
                >
                    <Icon
                        icon={theme === "light" ? "material-symbols:moon-stars-outline" : "material-symbols:sunny-outline"}
                        width="24"
                        height="24"
                    />
                </button>

                <a href={nextLanguageUrl}
                    class="language-toggle"
                    aria-label={nextLanguage?.name}
                    title={nextLanguage?.name}
                >
                    <Icon icon={`circle-flags:${nextLanguage?.key}`} width="24" height="24" />
                </a>
            </div>
        </aside>
    </div>

    <!-- Main Content -->
    <main class="page-content">
        {@render children()}

        {#if page.route.id !== "/[lang]/(general)"}
            <footer class="simple-footer">
                <p>&copy; {footerCopyright}</p>
            </footer>
        {/if}

        {#if chatView === "floating"}
            <ChatArea 
                floating={true}
                chatService={data.chatService}
                translations={translations}
                lang={language}
                info={translations[language].chat.ai_name}
                button_title={translations[language].chat.new_chat}
                place_holder={translations[language].chat.placeholder}
                
            />
        {/if}
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: var(--bg);
        color: var(--text);
        height: 100vh;
        height: 100dvh;
    }

    .layout-wrapper {
        position: relative;
        height: 100vh;
        height: 100dvh;
        display: grid;
        grid-template-columns: 280px 1fr;
    }

    /* Main Content */
    .page-content {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        padding-top: 0; /* No top bar */
        overflow-y: auto; /* Enable scroll for standard pages */
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
    }

    /* Floating Burger (Mobile Only) */
    .burger-float {
        display: none;
    }

    .logo-float {
        display: none;
    }

    /* Sidebar/Drawer */
    .sidebar {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--sidebar-bg);
        color: var(--text);
        padding: 20px;
        z-index: 1500;
        border-right: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .sidebar-logo {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        padding: 0 10px;
    }
    
    .sidebar-logo img {
        height: 64px;
        width: auto;
    }

    .menu {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex-shrink: 0; 
    }

    .menu-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        transition: all 0.2s;
        font-weight: 500;
        border: 1px solid transparent;
    }

    .menu-item:hover {
        background: var(--btn-hover);
        color: var(--brand);
        border-color: var(--border);
    }
    
    /* Sidebar Cards */
    .sidebar-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 20px;
        overflow-y: auto;
        padding-bottom: 20px;
        flex: 1; /* Push footer down */
        scrollbar-width: thin;
    }
    
    .mobile-only-cards {
        display: none;
    }
    
    @media (max-width: 900px) {
        .mobile-only-cards {
            display: flex;
        }
    }
    
    .sidebar-cards::-webkit-scrollbar {
        width: 4px;
    }
    
    .sidebar-cards::-webkit-scrollbar-thumb {
        background: var(--border-strong, #ccc);
        border-radius: 4px;
    }

    .mini-card {
        display: flex;
        align-items: center;
        background: var(--card-bg, #fff);
        border: 1px solid var(--border, #eaeaea);
        border-radius: 12px;
        padding: 8px;
        gap: 12px;
        width: 100%;
        box-sizing: border-box;
        text-decoration: none;
        color: var(--text, #333);
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    }

    .mini-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-color: var(--brand, #007bff);
        background: var(--brand-soft);
    }

    .mc-img-wrapper {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 8px;
        overflow: hidden;
    }

    .mc-img-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .mc-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        flex: 1;
    }

    .mc-info h4 {
        margin: 0 0 4px 0;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .mc-price-row {
        display: flex;
        align-items: baseline;
        gap: 6px;
    }

    .mc-label {
        font-size: 10px;
        text-transform: uppercase;
        color: var(--brand, #888);
        font-weight: 800;
        letter-spacing: 0.5px;
    }

    .mc-price {
        font-size: 13px;
        font-weight: 800;
        color: var(--brand-dark, #0056b3);
    }

    .drawer-footer {
        margin-top: auto;
        padding-top: 20px;
        border-top: 1px solid var(--border);
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-shrink: 0;
    }

    .theme-toggle,
    .language-toggle {
        background: var(--btn-bg);
        color: var(--text);
        padding: 10px;
        border-radius: 12px;
        cursor: pointer;
        border: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }

    .theme-toggle:hover,
    .language-toggle:hover {
        transform: translateY(-2px);
        background: var(--btn-hover);
        border-color: var(--brand);
    }

    /* Footer */
    .simple-footer {
        padding: 20px;
        text-align: center;
        opacity: 0.6;
        font-size: 0.9rem;
        margin-top: 40px;
        border-top: 1px solid var(--border);
    }

    /* Responsive - Mobile layout */
    @media (max-width: 900px) {
        .layout-wrapper {
            display: flex; /* Reset grid to flex for full width */
        }
        
        .burger-float {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 2000;
            background: var(--btn-bg);
            color: var(--text);
            padding: 5px;
            border-radius: 50%;
            cursor: pointer;
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.2s;
        }
        .burger-float :global(svg) {
            width: 24px;
            height: 24px;
        }
        .logo-float {
            position: fixed;
            top: 10px;
            left: 60px;
            z-index: 2000;
            height: 38px;
            width: auto;
            display: block;
        }
        
        /* Reset sidebar for off-canvas sliding */
        .sidebar {
            position: fixed;
            top: 0;
            left: -320px;
            width: 280px;
            padding-top: 70px; /* Space for burger/logo */
            transition: left 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .sidebar.active {
            left: 0;
            box-shadow: 2px 0 20px rgba(0, 0, 0, 0.2);
        }
    }
</style>
