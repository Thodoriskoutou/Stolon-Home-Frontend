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

function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

$effect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    theme = savedTheme;
    document.documentElement.setAttribute("data-theme", theme);
});
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

    <div class="drawer">
        <!-- Burger open -->
        <button class="burger" onclick={() => (activeMenu = !activeMenu)}>
            {#if activeMenu}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><path
                        fill="currentColor"
                        d="M6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586z"
                    /></svg
                >
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><path
                        fill="currentColor"
                        d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
                    /></svg
                >
            {/if}
        </button>

        <aside class="sidebar" class:active={activeMenu}>
            <div class="toggle-light">
                <button class="theme-toggle" onclick={toggleTheme}>
                    {#if theme === "light"}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"/></svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M12 15q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15m0 2q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm18 0q-.425 0-.712-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8-8q-.425 0-.712-.288T11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5m0 18q-.425 0-.712-.288T11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23M5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7t-.687.288t-.713-.288M18 19.425l-1.05-1.075q-.275-.3-.275-.712t.275-.688q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275M4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288M12 12"/></svg>
                    {/if}
                </button>
            </div>
            <ul class="menu">
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
            </ul>
            <!-- Mobile-only cards render here -->
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
                        <div >
                            <img 
                            src="/stolonas1.png"
                            alt="Stolon Logo"
                            style="width: 100px; height: 100px;"/>
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
                    title={leftIconActive ? "Disable history mode" : "Enable history mode"}
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
```

<style>
    :root {
    /* Brand */
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

    /* Cards */
    --card-bg: #ffffff;
    --card-shadow:
        0 10px 30px rgba(0, 0, 0, 0.15),
        0 4px 8px rgba(0, 0, 0, 0.1);

    /* Sidebar */
    --sidebar-bg: #ffffff;

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
    --card-shadow:
        0 10px 30px rgba(0, 0, 0, 0.6),
        0 4px 8px rgba(0, 0, 0, 0.4);

    --sidebar-bg: #0f172a;

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

    /* Burger open */
    .burger  {
        position: fixed;
        top: 16px;
        left: 16px;
        background: #f3f4f6;
        color: #000000;
        padding: 6px;
        border-radius: 8px;
        cursor: pointer;
        z-index: 1001;
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Sidebar drawer */
    .sidebar {
        position: fixed;
        top: 0;
        left: -319px;
        width: 280px;
        height: 100%;
        background: #ffffff;
        color: #000000;
        padding: 20px;
        transition: left 0.35s ease;
        z-index: 1000;
        border-right: 1px solid #e5e7eb;
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

    .logo-wrapper {
        position: absolute;
        left: 100px; /* όταν το sidebar είναι κλειστό */
        display: flex;
        flex-direction: column; /* stack logos vertically */
        gap: 10px; /* space between logos */
        transition: left 0.3s;
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
        /* position: relative; removed to avoid conflict with flex flow if not needed, but can stay. Flex is key */
        color: #000000;
        /* No transition on justify-content needed */
    }

    .chat-area h1 {
        font-size:2.5rem;
        font-weight:600;
        opacity:0.9;
        margin-bottom:40px;
        color:#000000;
        text-align:center;
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
        0%, 100% { background-position: 0% 0%; }
        50% { background-position: 100% 0%; }
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
        background: radial-gradient(circle, rgba(62, 155, 69, 0.15) 0%, transparent 70%);
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
        background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
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
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
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
        background: radial-gradient(circle, rgba(62, 155, 69, 0.15) 0%, transparent 70%);
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
    

    

    /* Mobile Cards Wrapper (Hidden on desktop by default) */
    .mobile-cards-wrapper {
        display: none;
    }

    @media (max-width: 768px) {
        /* Show mobile cards inside sidebar */
        .mobile-cards-wrapper {
            display: flex;
            flex-direction: column;
            gap: 8px; /* Tighter gap */
            margin-top: 12px;
            padding-bottom: 20px;
        }

        /* Scale down cards for mobile */
        .mobile-cards-wrapper :global(.card) {
            transform: scale(0.85); /* Smaller cards */
            transform-origin: top center;
            margin-bottom: -15px; /* More negative margin to pull them up */
        }

        /* Hide desktop cards area */
        .cards-area.desktop-only {
            display: none;
        }

        /* SIDEBAR DRAWER (MOBILE) - Compact Width */
        .sidebar {
            position: fixed;
            top: 0;
            left: -100%; /* Hide off-screen */
            width: 85vw; /* Partial width */
            max-width: 300px; /* Don't get too wide */
            height: 100vh;
            padding: 20px;
            background: #ffffff;
            border-right: 1px solid #e5e7eb; /* Add border back */
            transition: left 0.35s ease;
            z-index: 1100;
            overflow-y: auto;
            overscroll-behavior: contain;
            box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1); /* Shadow for depth */
        }

        /* OPEN STATE */
        .sidebar.active {
            left: 0;
        }

        /* MENU */
        .menu {
            padding-top: 50px; /* Reduced top space */
            gap: 8px; /* Tighter items */
        }

        .menu li {
            padding: 10px 14px; /* Compact padding */
            font-size: 16px;
        }

        /* Adjust icons in menu if needed */
        .menu-item svg {
            width: 24px;
            height: 24px;
        }

        /* BURGER ALWAYS ON TOP */
        .burger {
            top: 12px;
            left: 12px;
            z-index: 1200;
        }

    .theme-toggle{top: 12px;
            left: 12px;
            z-index: 1200;
            margin-top: -23px;}

        .layout-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 100vh;
            width: 100vw;
            overflow: hidden;
            position: fixed;
        }

        .chat-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
        }

        /* LOGOS - COMPACT */
        .logo-wrapper {
            position: relative;
            left: auto;
            top: auto;
            margin-top: 60px;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
            width: 100%;
            flex-shrink: 0;
        }

        .logo-wrapper img {
            width: 70px; /* Even smaller logos */
            height: 70px;
            object-fit: contain;
        }

        /* MESSAGES SCROLL AREA */
        .messages-container {
            flex: 1;
            width: 100%;
            overflow-y: constant;
            overflow-y: scroll;
            padding: 0 16px;
        }
        

        /* INPUT BAR ADJUSTMENT */
        .input-area {
            flex-shrink: 0;
            padding: 12px;
            background: #ffffff;
        }

        .input-wrapper {
            border-radius: 20px;
        }
    }
    :root {
    --bg: #ffffff;
    --text: #000000;
    --card-bg: #ffffff;
    --border: #e5e7eb;
}

[data-theme="dark"] {
    --bg: #0f172a;
    --text: #e5e7eb;
    --card-bg: #020617;
    --border: #1e293b;
}
.theme-toggle{
    background: #f3f4f6;
    color: #000000;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    z-index: 1001;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.toggle-light {
    position: sticky; /* sticks inside sidebar */
    top: 16px;        /* distance from top */
    right: 50px;
    display: flex;
    justify-content: flex-start;
    z-index: 1200;
    float: right;
    cursor: pointer;
}
.toggle-theme{
    background: #f3f4f6;
        color: #000000;
        padding: 6px;
        border-radius: 8px;
        cursor: pointer;
        z-index: 1001;
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
}

/* ===== APPLY ===== */
:global(body) {
    background-color: var(--bg);
    color: var(--text);
}

.card,
.sidebar,
.input-wrapper,
.messageBox {
    background-color: var(--card-bg);
    border-color: var(--border);
}
.card h4 {
    color: var(--text);
}
.card .price-label {
    color: var(--card-bg);
}
h1,
h4,
.menu-item,
.bubble
 {
    color: var(--text);
}

.chat-area,
.chat-area .messages-container,
.chat-area .input-area,
.input-wrapper,
.messageBox {

  color: var(--text);
}

/* Bubbles */
.chat-area .bubble,
.chat-area .ai-bubble,
.chat-area .user-bubble {
  color: var(--text);
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--card-bg) 92%, transparent 8%);
  padding: 12px;
  border-radius: 12px;
}

/* Assistant bubble (code / markdown) */
.chat-area .ai-bubble {
  background: color-mix(in srgb, var(--card-bg) 86%, #f9fafb 14%);
}
.chat-area .ai-bubble :global(pre) {
  background: color-mix(in srgb, var(--card-bg) 84%, #f3f4f6 16%);
  border: 1px solid var(--border);
  color: var(--text);
}
.chat-area .ai-bubble :global(code) {
  color: var(--text);
}

/* User bubble */
.chat-area .user-bubble {
  background: color-mix(in srgb, var(--card-bg) 80%, #f3f4f6 20%);
  border: 1px solid var(--border);
  color: var(--text);
}

/* Avatars */
.chat-area .avatar.ai { background: var(--avatar-ai); color: #fff; }
.chat-area .avatar.user { background: var(--avatar-user); color: #fff; }

/* Input area and textarea */
.input-wrapper,
.messageBox {
  background: var(--card-bg);
  border: 1px solid var(--border);
}
#messageInput,
.input-wrapper textarea,
.messageBox textarea {
  color: var(--text);
  background: transparent;
  caret-color: var(--text);
}

/* Icon colors */
.icon-button svg { color: color-mix(in srgb, var(--text) 68%, var(--text-muted, #6b7280) 32%); }
.icon-button:hover svg { color: var(--brand); }

/* Make sure message text injected by marked is readable */
.chat-area :global(p),
.chat-area :global(li),
.chat-area :global(h1),
.chat-area :global(h2),
.chat-area :global(h3),
.chat-area :global(pre),
.chat-area :global(code) {
  color: var(--text);
}

/* Mobile / small adjustments (override duplicates) */
@media (max-width: 768px) {
  .input-area { background: var(--card-bg); }
  .sidebar { background: var(--card-bg); border-right: 1px solid var(--border); }
}

</style>
