<script>
    import { marked } from "marked";
    let { data } = $props();
    const { chatService } = data;

    let activeMenu = $state(false);
    let leftIconActive = $state(false);
    /** @type {Array<{role: string, content: string}>} */
    let messages = $state([]);
    let userInput = $state("");
    let isGenerating = $state(false);
    /** @type {HTMLElement} */
    let chatContainer;

    let messageInputel;
    let theme = $state("light");
    let language = $state("english");

    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        theme = newTheme;
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    $effect(() => {
        // Sync theme with localStorage (only if not already set by app.html)
        const savedTheme = localStorage.getItem("theme") || "light";
        if (theme !== savedTheme) {
            theme = savedTheme;
            document.documentElement.setAttribute("data-theme", theme);
        }
    });
    let lang = false;
    function toggleLanguage() {
        if (lang == true) {
            language = "greek";
        } else {
            language = "english";
        }
    }

    function autoResize(e) {
        const el = e.target;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 240) + "px"; // cap height
    }

    function loadMessages() {
        const saved = localStorage.getItem("chat_history");
        if (saved) {
            messages = JSON.parse(saved);
        }
    }

    $effect(() => {
        if (typeof localStorage !== "undefined") {
            loadMessages();
        }
    });

    $effect(() => {
        if (messages.length > 0 && typeof localStorage !== "undefined") {
            localStorage.setItem("chat_history", JSON.stringify(messages));
            scrollToBottom();
        }
    });

    function scrollToBottom() {
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 0);
        }
    }

    async function sendMessage() {
        if (!userInput.trim() || isGenerating) return;

        const currentInput = userInput;
        userInput = "";
        isGenerating = true;

        // Add user message
        const userMsg = { role: "user", content: currentInput };
        messages = [...messages, userMsg];

        // placeholder for AI response
        const aiMsg = { role: "assistant", content: "" };
        messages = [...messages, aiMsg];
        let responseContent = "";

        // Start streaming
        await chatService.sendMessage(currentInput, (chunk) => {
            responseContent += chunk;
            // Update the last message (AI) with new content
            messages[messages.length - 1].content = responseContent;
            scrollToBottom();
        });

        isGenerating = false;
    }

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
</script>

<div class="layout-container">
    {#snippet cardsContent()}
        <div class="section-container">
            <div class="cards-area">
                <div class="card card-website">
                    <div class="card-glow"></div>
                    <div class="card-image-wrapper">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/02/24/04/25/web-design-4875183_1280.jpg"
                            alt="Website"
                            class="card-image"
                        />
                        <div class="card-image-overlay"></div>
                    </div>
                    <div class="card-content">
                        <h4>Φτιάξε το δικό σου site</h4>
                        <div class="price-container">
                            <span class="price-label">Μόνο με</span>
                            <div class="price-value">
                                <span class="currency">€</span>
                                <span class="amount">250</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card card-nextcloud">
                    <div class="card-glow"></div>
                    <div class="card-image-wrapper">
                        <img
                            src="https://cdn.thenewstack.io/media/2023/09/94b1d1e3-nextcloud.jpg"
                            alt="Nextcloud"
                            class="card-image"
                        />
                        <div class="card-image-overlay"></div>
                    </div>
                    <div class="card-content">
                        <h4>Άκομα είσαι στην Microsoft 365;</h4>
                        <div class="price-container">
                            <span class="price-label">Μπες τώρα με</span>
                            <div class="price-value">
                                <span class="currency">€</span>
                                <span class="amount">1</span>
                                <span class="period">/μήνα</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/snippet}

    <header class="top-nav">
        <div class="nav-controls">
            <button
                class="burger"
                onclick={() => (activeMenu = !activeMenu)}
                aria-label="Toggle menu"
            >
                {#if activeMenu}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586z"
                        />
                    </svg>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
                        />
                    </svg>
                {/if}
            </button>

            <div class="toggles-group">
                <button
                    class="theme-toggle"
                    onclick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {#if theme === "light"}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            ><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
                                fill="currentColor"
                                d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"
                            /></svg
                        >
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            ><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
                                fill="currentColor"
                                d="M12 15q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15m0 2q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm18 0q-.425 0-.712-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8-8q-.425 0-.712-.288T11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5m0 18q-.425 0-.712-.288T11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23M5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7t-.687.288t-.713-.288M18 19.425l-1.05-1.075q-.275-.3-.275-.712t.275-.688q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275M4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288M12 12"
                            /></svg
                        >
                    {/if}
                </button>

                <button
                    class="language-toggle"
                    onclick={() => {
                        lang = !lang;
                        toggleLanguage();
                    }}
                    aria-label="Toggle language"
                >
                    {#if language === "english"}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="27"
                            viewBox="0 0 32 24"
                            ><g fill="none"
                                ><path
                                    fill="#F7FCFF"
                                    fill-rule="evenodd"
                                    d="M0 0h32v24H0z"
                                    clip-rule="evenodd"
                                /><path
                                    fill="#4564F9"
                                    fill-rule="evenodd"
                                    d="M0 5.5h32v2.957H0zm0 5.315h32v2.957H0zm32 5.128H0V18.9h32zM0 0h32v3H0z"
                                    clip-rule="evenodd"
                                /><path fill="#4564F9" d="M0 21h32v3H0z" /><path
                                    fill="#4564F9"
                                    fill-rule="evenodd"
                                    d="M0 0h15v13.8H0z"
                                    clip-rule="evenodd"
                                /><path
                                    fill="#F7FCFF"
                                    fill-rule="evenodd"
                                    d="M6 0h3v5.504h6v2.935H9V14.5H6V8.439H0V5.504h6z"
                                    clip-rule="evenodd"
                                /></g
                            ></svg
                        >
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="27"
                            viewBox="0 0 32 24"
                            ><g fill="none"
                                ><path
                                    fill="#2E42A5"
                                    fill-rule="evenodd"
                                    d="M0 0v24h32V0z"
                                    clip-rule="evenodd"
                                /><mask
                                    id="SVGTrazyc7b"
                                    width="32"
                                    height="24"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                    style="mask-type:luminance"
                                    ><path
                                        fill="#fff"
                                        fill-rule="evenodd"
                                        d="M0 0v24h32V0z"
                                        clip-rule="evenodd"
                                    /></mask
                                ><g mask="url(#SVGTrazyc7b)"
                                    ><path
                                        fill="#fff"
                                        d="m-3.563 22.285l7.042 2.979l28.68-22.026l3.715-4.426l-7.53-.995l-11.698 9.491l-9.416 6.396z"
                                    /><path
                                        fill="#F50100"
                                        d="M-2.6 24.372L.989 26.1L34.54-1.599h-5.037z"
                                    /><path
                                        fill="#fff"
                                        d="m35.563 22.285l-7.042 2.979L-.159 3.238l-3.715-4.426l7.53-.995l11.698 9.491l9.416 6.396z"
                                    /><path
                                        fill="#F50100"
                                        d="m35.323 23.783l-3.588 1.728l-14.286-11.86l-4.236-1.324l-17.445-13.5H.806l17.434 13.18l4.631 1.588z"
                                    /><mask id="SVGOYc5edRg" fill="#fff"
                                        ><path
                                            fill-rule="evenodd"
                                            d="M19.778-2h-7.556V8H-1.972v8h14.194v10h7.556V16h14.25V8h-14.25z"
                                            clip-rule="evenodd"
                                        /></mask
                                    ><path
                                        fill="#F50100"
                                        fill-rule="evenodd"
                                        d="M19.778-2h-7.556V8H-1.972v8h14.194v10h7.556V16h14.25V8h-14.25z"
                                        clip-rule="evenodd"
                                    /><path
                                        fill="#fff"
                                        d="M12.222-2v-2h-2v2zm7.556 0h2v-2h-2zM12.222 8v2h2V8zM-1.972 8V6h-2v2zm0 8h-2v2h2zm14.194 0h2v-2h-2zm0 10h-2v2h2zm7.556 0v2h2v-2zm0-10v-2h-2v2zm14.25 0v2h2v-2zm0-8h2V6h-2zm-14.25 0h-2v2h2zm-7.556-8h7.556v-4h-7.556zm2 8V-2h-4V8zm-16.194 2h14.194V6H-1.972zm2 6V8h-4v8zm12.194-2H-1.972v4h14.194zm2 12V16h-4v10zm5.556-2h-7.556v4h7.556zm-2-8v10h4V16zm16.25-2h-14.25v4h14.25zm-2-6v8h4V8zm-12.25 2h14.25V6h-14.25zm-2-12V8h4V-2z"
                                        mask="url(#SVGOYc5edRg)"
                                    /></g
                                ></g
                            ></svg
                        >
                    {/if}
                </button>
            </div>
        </div>
    </header>

    <div class="drawer">
        <aside class="sidebar" class:active={activeMenu}>
            <ul class="menu">
                <li>
                    <a href="https://www.stolon-edu.com/" class="menu-link">
                        <div class="menu-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                ><!-- Icon from TDesign Icons by TDesign - https://github.com/Tencent/tdesign-icons/blob/main/LICENSE --><g
                                    fill="none"
                                    ><path
                                        d="M2 8.5L12 2l10 6.5l-4 2.6l-6 3.9l-6-3.9z"
                                    /><path
                                        d="M6 17.5v-6.4l6 3.9l6-3.9v6.4c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5"
                                    /><path
                                        stroke="currentColor"
                                        stroke-linecap="square"
                                        stroke-width="2"
                                        d="M21 9.15V15M6 11.1v6.4c0 1.933 2.686 3.5 6 3.5s6-1.567 6-3.5v-6.4L12 15zM12 2L2 8.5L12 15l10-6.5z"
                                    /></g
                                ></svg
                            >
                            Stolon Edu
                        </div>
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.stolon-marketing.com/"
                        class="menu-link"
                    >
                        <div class="menu-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                ><!-- Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License --><path
                                    fill="currentColor"
                                    d="M9 17s7 1 10 4h1a1 1 0 0 0 1-1v-6.063a2 2 0 0 0 0-3.874V4a1 1 0 0 0-1-1h-1C16 6 9 7 9 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1l1 5h2zm2-8.339c.683-.146 1.527-.35 2.44-.617c1.678-.494 3.81-1.271 5.56-2.47v12.851c-1.75-1.198-3.883-1.975-5.56-2.469A34 34 0 0 0 11 15.34zM5 9h4v6H5z"
                                /></svg
                            >
                            Stolon Marketing
                        </div>
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.stolon-business.com/"
                        class="menu-link"
                    >
                        <div class="menu-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                ><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    ><path
                                        d="M12 12h.01M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m14 7a18.15 18.15 0 0 1-20 0"
                                    /><rect
                                        width="20"
                                        height="14"
                                        x="2"
                                        y="6"
                                        rx="2"
                                    /></g
                                ></svg
                            >
                            Stolon Business
                        </div>
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.stolon-computerization.com/"
                        class="menu-link"
                    >
                        <div class="menu-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                ><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
                                    fill="currentColor"
                                    d="M1 20q-.425 0-.712-.288T0 19t.288-.712T1 18h1V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v13h1q.425 0 .713.288T24 19t-.288.713T23 20zm9.5-2h3q.2 0 .35-.15t.15-.35t-.15-.35t-.35-.15h-3q-.2 0-.35.15t-.15.35t.15.35t.35.15M4 15h16V5H4zm8-5"
                                /></svg
                            >
                            Stolon Computerization
                        </div>
                    </a>
                </li>
                <li>
                    <a href="https://www.stolon-AI.com/" class="menu-link">
                        <div class="menu-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                ><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path
                                    fill="currentColor"
                                    d="M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 3h-2v3H5v-3H3v-1h2v-2c0-2.76 2.24-5 5-5h4c2.76 0 5 2.24 5 5v2h2zM8.5 13.5l2.36 2.36l-1.18 1.18l-1.18-1.18l-1.18 1.18l-1.18-1.18zm7 0l2.36 2.36l-1.18 1.18l-1.18-1.18l-1.18 1.18l-1.18-1.18z"
                                /></svg
                            >
                            Stolon AI
                        </div>
                    </a>
                </li>
                <li>
                    <a href="/blog" class="menu-link">
                        <div class="menu-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                ><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path
                                    fill="currentColor"
                                    d="M19 19V5H5v14zm0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-2.3 6.35l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M7 14.94l6.06-6.06l2.06 2.06L9.06 17H7z"
                                /></svg
                            >
                            Blog
                        </div>
                    </a>
                </li>
            </ul>
            <div class="mobile-cards-wrapper">
                {@render cardsContent()}
            </div>
        </aside>
    </div>

    <div class="logo-wrapper" class:active={activeMenu}>
        {#if theme === "light"}
            <img
                src="/StolonLogo.png"
                alt="Stolon Logo"
                style="width: 150px; height: 150px;"
            />
        {:else}
            <img
                src="/StolonDark.png"
                alt="Stolon Logo Dark"
                style="width: 150px; height: 150px;"
            />
        {/if}
    </div>

    <div class="chat-area" class:startup={messages.length === 0}>
        <h1>How may I help you today?</h1>
        <div class="messages-container" bind:this={chatContainer}>
            {#each messages as msg}
                <div class="message {msg.role}">
                    {#if msg.role === "assistant"}
                        <div>
                            <img
                                src="/stolonas1.png"
                                alt="Stolon Logo"
                                style="width: 100px; height: 100px;"
                            />
                        </div>
                        <div class="bubble ai-bubble">
                            {@html marked(msg.content)}
                        </div>
                    {:else}
                        <div class="bubble user-bubble">{msg.content}</div>
                        <div class="avatar user">U</div>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="input-area">
            <div class="input-wrapper messageBox">
                <!-- LEFT ICON BUTTON (toggles between two icons) -->
                <button
                    class="icon-button left-icon-btn"
                    onclick={() => (leftIconActive = !leftIconActive)}
                    title={leftIconActive
                        ? "Disable history mode"
                        : "Enable history mode"}
                    aria-label="Toggle left icon"
                >
                    {#if !leftIconActive}
                        <!-- First icon - add your first Iconify icon here -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="42"
                            height="42"
                            viewBox="0 0 24 24"
                            ><!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE --><g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                ><path d="M12 8v4l2 2" /><path
                                    d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"
                                /></g
                            ></svg
                        >
                    {:else}
                        <!-- Second icon - add your second Iconify icon here -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="42"
                            height="42"
                            viewBox="0 0 24 24"
                            ><!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE --><path
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3.05 11a8.98 8.98 0 0 1 2.54-5.403M7.904 3.9a9 9 0 0 1 12.113 12.112m-1.695 2.312A9 9 0 0 1 3.55 15m-.5 5v-5h5M3 3l18 18"
                            /></svg
                        >
                    {/if}
                </button>
                <textarea
                    id="messageInput"
                    rows="1"
                    placeholder="Message us... (Shift+Enter for new line)"
                    bind:value={userInput}
                    bind:this={messageInputel}
                    onkeydown={(e) => handleKeydown(e)}
                    oninput={(e) => autoResize(e)}
                ></textarea>

                <!-- RIGHT ICONS CONTAINER -->
                <div class="right-icons-container">
                    <button
                        class="icon-button microphone-btn"
                        aria-label="Microphone"
                        title="Dictate"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            ><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path
                                fill="currentColor"
                                d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5z"
                            /></svg
                        >
                    </button>

                    <button
                        class="icon-button voiceover-btn"
                        aria-label="Voice over"
                        title="Use voice"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            ><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g
                                fill="none"
                                ><path
                                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                                /><path
                                    fill="currentColor"
                                    d="M12 3a1 1 0 0 1 .993.883L13 4v16a1 1 0 0 1-1.993.117L11 20V4a1 1 0 0 1 1-1M8 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1m8 0a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1M4 9a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1m16 0a1 1 0 0 1 .993.883L21 10v4a1 1 0 0 1-1.993.117L19 14v-4a1 1 0 0 1 1-1"
                                /></g
                            ></svg
                        >
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="cards-area desktop-only">
        {@render cardsContent()}
    </div>
</div>

<style>
    :root {
        /* Brand Colors */
        --brand: #3e9b45;
        --brand-dark: #15803d;
        --brand-soft: #dcfce7;
        --brand-glow: rgba(62, 155, 69, 0.15);

        /* Backgrounds */
        --bg: #ffffff;
        --bg-soft: #f9fafb;
        --bg-muted: #f3f4f6;

        /* Text */
        --text: #000000;
        --text-muted: #6b7280;
        --text-soft: #9ca3af;

        /* Borders */
        --border: #e5e7eb;
        --border-strong: #86efac;

        /* Cards & Components */
        --card-bg: #ffffff;
        --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.15),
            0 4px 8px rgba(0, 0, 0, 0.1);

        /* Sidebar & Header */
        --sidebar-bg: #ffffff;
        --nav-bg: rgba(255, 255, 255, 0.8);

        /* Inputs */
        --input-bg: #ffffff;
        --input-border: #e5e7eb;
        --input-focus: #3e9b45;

        /* Buttons */
        --btn-bg: #f3f4f6;
        --btn-text: #000000;
        --btn-hover: #e5e7eb;

        /* Avatars */
        --avatar-ai: #3e9b45;
        --avatar-user: #ec2025;

        /* Grid */
        --grid-line: rgba(62, 155, 69, 0.05);
    }

    /* ===== DARK MODE ===== */

    :root[data-theme="dark"] {
        --brand: #4ade80;
        --brand-dark: #22c55e;
        --brand-soft: #052e16;
        --brand-glow: rgba(74, 222, 128, 0.25);

        --bg: #0b0f0d;
        --bg-soft: #111827;
        --bg-muted: #1f2937;

        --text: #f9fafb;
        --text-muted: #9ca3af;
        --text-soft: #6b7280;

        --border: #1f2937;
        --border-strong: #166534;

        --card-bg: #111827;
        --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.6),
            0 4px 8px rgba(0, 0, 0, 0.4);

        --sidebar-bg: #0f172a;
        --nav-bg: rgba(11, 15, 13, 0.8);

        --input-bg: #020617;
        --input-border: #1f2937;
        --input-focus: #4ade80;

        --btn-bg: #020617;
        --btn-text: #f9fafb;
        --btn-hover: #1f2937;

        --avatar-ai: #4ade80;
        --avatar-user: #f87171;

        --grid-line: rgba(74, 222, 128, 0.06);
    }

    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: var(--bg);
        color: var(--text);
    }

    :global(body)::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(
                90deg,
                rgba(62, 155, 69, 0.05) 1px,
                transparent 1px
            ),
            linear-gradient(rgba(62, 155, 69, 0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        z-index: 0;
        animation: gridScroll 20s linear infinite;
    }

    @keyframes gridScroll {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(50px, 50px);
        }
    }

    .layout-container {
        display: grid;
        grid-template-columns: 260px 1fr 327px;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        position: relative;
        z-index: 1; /* Ensure content is above the grid */
    }

    .top-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        z-index: 1001;
        background: var(--nav-bg);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid var(--border);
    }

    .nav-controls {
        display: flex;
        align-items: center;
        gap: 15px;
        width: 100%;
    }

    .toggles-group {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left: auto;
    }

    .burger,
    .theme-toggle,
    .language-toggle {
        background: var(--btn-bg);
        color: var(--text);
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        border: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .burger:hover,
    .theme-toggle:hover,
    .language-toggle:hover {
        background: var(--btn-hover);
        border-color: var(--brand);
    }

    /* Sidebar drawer */
    .sidebar {
        position: fixed;
        top: 0;
        left: -320px;
        width: 280px;
        height: 100%;
        background: var(--sidebar-bg);
        color: var(--text);
        padding: 80px 20px 20px; /* Offset for top-nav */
        transition: left 0.35s ease;
        z-index: 1000;
        border-right: 1px solid var(--border);
    }

    /* Open drawer */
    .active {
        left: 0;
    }

    /* Menu */
    .menu {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-top: 4rem;
    }

    .menu li {
        padding: 0;
        border-radius: 8px;
        cursor: pointer;
        color: #374151;
        font-weight: 450;
        transition: all 0.2s;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        transition: all 0.2s;
    }

    .menu li:hover .menu-item {
        background: #f3f4f6;
        color: #3e9b45;
        border-color: #3e9b45;
    }

    /* MENU LINKS */
    .menu-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .menu-link .menu-item {
        transition: all 0.2s ease;
    }

    .logo-wrapper {
        position: fixed;
        top: 90px;
        left: 100px; /* όταν το sidebar είναι κλειστό */
        display: flex;
        flex-direction: column; /* stack logos vertically */
        gap: 10px; /* space between logos */
        transition:
            left 0.3s,
            top 0.3s;
        z-index: 1002; /* Above header and sidebar */
    }

    .logo-wrapper.active {
        left: 320px; /* όταν το sidebar ανοίγει */
    }

    .logo-wrapper img {
        width: 120px; /* προσαρμόζεις μέγεθος ανάλογα */
        height: auto; /* κρατάει aspect ratio */
    }

    .chat-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
        color: #000000;
        padding-top: 70px; /* Offset for top-nav */
        box-sizing: border-box;
    }

    .chat-area h1 {
        font-size: 2.5rem;
        font-weight: 600;
        opacity: 0.9;
        margin-bottom: 40px;
        color: #000000;
        text-align: center;
    }
    .messages-container {
        flex-grow: 1; /* Grow to fill space */
        width: 100%;
        max-width: 800px;
        overflow-y: auto;
        padding-bottom: 20px; /* Reduced padding */
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-top: 20px;
        transition:
            flex-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            padding 0.8s ease; /* Smooth toggle */
        min-height: 0; /* Important for flex smooth collapse */
    }

    .chat-area.startup .messages-container {
        flex-grow: 0.0001; /* Animates to almost 0 */
        padding-top: 35px;
        padding-bottom: 1;
        overflow: hidden;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .messages-container::-webkit-scrollbar {
        display: none;
    }

    .message {
        display: flex;
        gap: 16px;
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
        border-radius: 8px;
    }

    .message.assistant {
        background-color: transparent;
    }

    .message.user {
        justify-content: flex-end;
    }

    .avatar {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        flex-shrink: 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .avatar.ai {
        background: #3e9b45;
        color: white;
    }

    .avatar.user {
        background: #ec2025;
        color: white;
    }

    .bubble {
        max-width: 70%;
        line-height: 1.6;
        font-size: 16px;
    }

    .ai-bubble :global(p) {
        margin: 0 0 10px 0;
        color: #000000;
    }
    .ai-bubble :global(a) {
        color: #3e9b45;
        text-decoration: underline;
    }
    .ai-bubble :global(pre) {
        background: #f9fafb;
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
        border: 1px solid #e5e7eb;
    }
    .ai-bubble :global(code) {
        color: #000000;
    }

    .user-bubble {
        background: #f3f4f6;
        padding: 12px 18px;
        border-radius: 12px;
        color: #000000;
        border: 1px solid #e5e7eb;
    }

    .input-area {
        width: 100%;
        max-width: 100%;
        padding: 24px;
        background: transparent;
        display: flex;
        justify-content: center;
        flex-shrink: 0; /* Prevents squishing */
        z-index: 10;
    }

    /* .chat-area.startup .input-area removed as it is same layout just shifted by flex sibling */

    .input-wrapper {
        width: 100%;
        max-width: 768px;
        position: relative;
        background: #ffffff;
        border-radius: 12px;
        box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        pointer-events: auto;
    }

    .input-wrapper input {
        width: 100%;
        background: transparent;
        border: none;
        padding: 16px 45px 16px 16px;
        color: #000000;
        font-size: 16px;
        outline: none;
        border-radius: 12px;
    }

    .input-wrapper input::placeholder {
        color: #9ca3af;
    }

    .send-btn {
        position: absolute;
        right: 10px;
        background: #3e9b45;
        border: none;
        color: white;
        cursor: pointer;
        padding: 6px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        transition: background-color 0.2s;
    }

    .send-btn:hover {
        background: #15803d;
    }

    .send-btn:disabled {
        opacity: 0.5;
        background: transparent;
        color: #9ca3af;
        cursor: default;
    }
    .cards-area {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 327px;
        padding-top: 70px; /* Offset for top-nav */
        box-sizing: border-box;
        height: 100vh;
        overflow-y: auto;
    }

    .card {
        position: relative;
        background: #ffffff;
        border-radius: 20px;
        overflow: hidden;
        box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.15),
            0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .section-container {
        padding: 40px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card-image-wrapper {
        position: relative;
        overflow: hidden;
        margin: 0;
        border-radius: 20px 20px 0 0;
        box-shadow: none;
    }
    @keyframes shimmer {
        0%,
        100% {
            background-position: 0% 0%;
        }
        50% {
            background-position: 100% 0%;
        }
    }

    .card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.2),
            0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .card-glow {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
            circle,
            rgba(62, 155, 69, 0.15) 0%,
            transparent 70%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
    }

    .card:hover .card-glow {
        opacity: 1;
    }

    .card-ribbon {
        position: absolute;
        top: 20px;
        right: -40px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
        color: white;
        padding: 8px 50px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1px;
        transform: rotate(45deg);
        box-shadow: 0 4px 12px rgba(238, 90, 111, 0.4);
        z-index: 10;
    }

    .card-image {
        width: 100%;
        height: 161px;
        object-fit: cover;
        display: block;
        transition: transform 0.4s ease;
    }

    .card:hover .card-image {
        transform: scale(1.08);
    }

    .card-image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .card:hover .card-image-overlay {
        opacity: 1;
    }

    .card-content {
        padding: 0 20px 20px;
    }

    .card h4 {
        margin: 0 0 8px;
        font-size: 17px;
        font-weight: 800;
        color: #1a1a1a;
        line-height: 1.3;
        text-align: center;
    }
    .card-description {
        font-size: 13px;
        color: #6b7280;
        margin: 0 0 16px;
        line-height: 1.5;
    }

    .price-container {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border: 2px solid #86efac;
        border-radius: 14px;
        padding: 16px;
        margin-bottom: 0;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .price-container::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 70%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .card:hover .price-container::before {
        opacity: 1;
    }

    .price-label {
        display: block;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1.5px;
        color: #15803d;
        margin-bottom: 8px;
        text-transform: uppercase;
        text-align: center;
        padding-left: 12px;
    }

    .price-value {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 2px;
    }

    .currency {
        font-size: 24px;
        font-weight: 800;
        color: #15803d;
    }

    .amount {
        font-size: 42px;
        font-weight: 900;
        color: #15803d;
        line-height: 1;
        letter-spacing: -2px;
    }

    .period {
        font-size: 15px;
        font-weight: 700;
        color: #15803d;
    }

    /* Card-specific styling */
    .card-website::before {
        background: linear-gradient(90deg, #3e9b45, #15803d, #3e9b45);
        background-size: 200% 100%;
    }

    .card-nextcloud::before {
        background: linear-gradient(90deg, #3e9b45, #15803d, #3e9b45);
        background-size: 200% 100%;
    }

    .card-nextcloud .card-glow {
        background: radial-gradient(
            circle,
            rgba(62, 155, 69, 0.15) 0%,
            transparent 70%
        );
    }

    .card-nextcloud .price-container {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border-color: #86efac;
    }

    .card-nextcloud .currency,
    .card-nextcloud .amount,
    .card-nextcloud .period {
        color: #15803d;
    }

    /* Badge on card */
    .card-badge {
        position: absolute;
        top: 16px;
        left: 16px;
        background: rgba(255, 255, 255, 0.95);
        color: #15803d;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.5px;
        z-index: 5;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        text-transform: uppercase;
    }
    .messageBox {
        min-height: 48px;
        display: flex;
        align-items: flex-end; /* keep icons aligned to bottom while textarea grows */
        gap: 8px;
        padding: 6px 12px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        background: #ffffff;
        box-sizing: border-box;
    }

    .messageBox:focus-within {
        border-color: #3e9b45;
    }

    /* LEFT ICON PLACEHOLDER */
    .left-icon-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        flex-shrink: 0;
    }

    /* INPUT */
    #messageInput {
        flex: 1;
        width: 100%;
        min-height: 40px;
        max-height: 240px; /* cap growth */
        box-sizing: border-box;
        background: transparent;
        border: none;
        outline: none;
        padding: 8px 10px;
        color: #000;
        font-size: 16px;
        line-height: 1.4;
        resize: none;
        overflow: auto; /* scroll once it reaches max-height */
    }

    #messageInput::placeholder {
        color: #9ca3af;
    }

    /* RIGHT ICONS CONTAINER */
    .right-icons-container {
        display: flex;
        align-items: center;
        gap: 1px;
        flex-shrink: 0;
        color: #374151;
    }

    /* ICON BUTTONS */
    .icon-button {
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        padding: 0;
    }

    .icon-button svg {
        height: 18px;
        color: #6b7280;
        transition: color 0.2s;
    }

    .icon-button:hover svg {
        color: #3e9b45;
    }

    /* SEND BUTTON */

    @media (max-width: 768px) {
        .top-nav {
            height: 60px;
            padding: 0 15px;
        }

        .nav-controls {
            gap: 10px;
        }

        .burger,
        .theme-toggle,
        .language-toggle {
            padding: 6px;
        }

        .burger svg,
        .theme-toggle svg,
        .language-toggle svg {
            width: 24px;
            height: 24px;
        }

        /* Show mobile cards inside sidebar */
        .mobile-cards-wrapper {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 12px;
            padding-bottom: 20px;
        }

        /* Scale down cards for mobile */
        .mobile-cards-wrapper :global(.card) {
            transform: scale(0.9);
            transform-origin: top center;
        }

        /* Hide desktop cards area */
        .cards-area.desktop-only {
            display: none;
        }

        .sidebar {
            width: 80vw;
            max-width: 280px;
            padding-top: 70px;
            left: -100%; /* Hide off-screen by default on mobile */
        }

        .sidebar.active {
            left: 0;
        }

        .layout-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        .chat-area {
            flex: 1;
            padding-top: 60px; /* Offset for top-nav */
        }

        .logo-wrapper {
            margin-top: 20px;
            position: relative;
            top: auto;
            left: auto;
        }
    }

    /* Desktop Sidebar Cards - Hidden by default */
    .mobile-cards-wrapper {
        display: none;
    }

    /* ===== DARK MODE OVERRIDES & CLEANUP ===== */
    :global(body) {
        background-color: var(--bg);
        color: var(--text);
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
    }

    .card,
    .sidebar,
    .input-wrapper,
    .messageBox {
        background-color: var(--card-bg);
        border-color: var(--border);
    }

    h1,
    h4,
    .menu-item,
    .bubble {
        color: var(--text);
    }

    /* Bubbles */
    .bubble {
        color: var(--text);
        border: 1px solid var(--border);
        background: color-mix(in srgb, var(--card-bg) 95%, var(--text) 5%);
    }

    .ai-bubble {
        background: color-mix(in srgb, var(--card-bg) 90%, var(--text) 10%);
    }

    .ai-bubble :global(pre) {
        background: color-mix(in srgb, var(--card-bg) 85%, var(--text) 15%);
        border: 1px solid var(--border);
        color: var(--text);
    }

    .user-bubble {
        background: var(--brand-soft);
        color: var(--brand-dark);
        border-color: var(--brand-strong);
    }

    [data-theme="dark"] .user-bubble {
        background: var(--brand-dark);
        color: #fff;
    }

    /* Input area */
    #messageInput {
        color: var(--text);
    }

    .icon-button svg {
        color: var(--text-muted);
    }

    .icon-button:hover svg {
        color: var(--brand);
    }
</style>
