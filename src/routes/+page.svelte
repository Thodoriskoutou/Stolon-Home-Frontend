<script>
    import { marked } from 'marked';

    let activeMenu = $state(false);
    let leftIconActive = $state(false);
    /** @type {Array<{role: string, content: string}>} */
    let messages = $state([]);
    let userInput = $state('');
    /** @type {HTMLElement} */
    let chatContainer;

    function loadMessages() {
        const saved = localStorage.getItem('chat_history');
        if (saved) {
            messages = JSON.parse(saved);
        }
    }

    $effect(() => {
        // Run only on browser
        if (typeof localStorage !== 'undefined') {
            loadMessages();
        }
    });

    $effect(() => {
        if (messages.length > 0 && typeof localStorage !== 'undefined') {
            localStorage.setItem('chat_history', JSON.stringify(messages));
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
        if (!userInput.trim()) return;

        const userMsg = { role: 'user', content: userInput };
        messages = [...messages, userMsg];
        const currentInput = userInput;
        userInput = '';

        // Simulate AI response
        setTimeout(async () => {
            const aiContent = `Here is a search result for **"${currentInput}"**.\n\n* This is a list item\n* Another item\n\n\`\`\`javascript\nconsole.log('Markdown code block');\n\`\`\``;
            const aiMsg = { role: 'assistant', content: aiContent };
            messages = [...messages, aiMsg];
        }, 600);
    }

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
</script>

<div class="layout-container">
    <div class="drawer">

        <!-- Burger open -->
        <button class="burger" onclick={()=>activeMenu=!activeMenu}>
        {#if activeMenu}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586z"/></svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"/></svg>
        {/if}
    </button>


    <aside class="sidebar" class:active={activeMenu}>

            <ul class="menu">
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><!-- Icon from TDesign Icons by TDesign - https://github.com/Tencent/tdesign-icons/blob/main/LICENSE --><g fill="none"><path d="M2 8.5L12 2l10 6.5l-4 2.6l-6 3.9l-6-3.9z"/><path d="M6 17.5v-6.4l6 3.9l6-3.9v6.4c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5"/><path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M21 9.15V15M6 11.1v6.4c0 1.933 2.686 3.5 6 3.5s6-1.567 6-3.5v-6.4L12 15zM12 2L2 8.5L12 15l10-6.5z"/></g></svg>
                    Stolon Edu
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><!-- Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License --><path fill="currentColor" d="M9 17s7 1 10 4h1a1 1 0 0 0 1-1v-6.063a2 2 0 0 0 0-3.874V4a1 1 0 0 0-1-1h-1C16 6 9 7 9 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1l1 5h2zm2-8.339c.683-.146 1.527-.35 2.44-.617c1.678-.494 3.81-1.271 5.56-2.47v12.851c-1.75-1.198-3.883-1.975-5.56-2.469A34 34 0 0 0 11 15.34zM5 9h4v6H5z"/></svg>
                    Stolon Marketing
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 12h.01M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m14 7a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/></g></svg>
                    Stolon Business
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M1 20q-.425 0-.712-.288T0 19t.288-.712T1 18h1V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v13h1q.425 0 .713.288T24 19t-.288.713T23 20zm9.5-2h3q.2 0 .35-.15t.15-.35t-.15-.35t-.35-.15h-3q-.2 0-.35.15t-.15.35t.15.35t.35.15M4 15h16V5H4zm8-5"/></svg>
                    Stolon Computerization
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 3h-2v3H5v-3H3v-1h2v-2c0-2.76 2.24-5 5-5h4c2.76 0 5 2.24 5 5v2h2zM8.5 13.5l2.36 2.36l-1.18 1.18l-1.18-1.18l-1.18 1.18l-1.18-1.18zm7 0l2.36 2.36l-1.18 1.18l-1.18-1.18l-1.18 1.18l-1.18-1.18z"/></svg>
                    Stolon AI
                </li>
            </ul>

        </aside>

    </div>


    <div class="chat-area" class:startup={messages.length === 0}>
        <img src="/StolonLogo.png" alt="Stolon Logo" style="width: 200px; height: 200px;"/>
        <h1>What are you searching today</h1>
        
        <div class="messages-container" bind:this={chatContainer}>
            {#each messages as msg}
                <div class="message {msg.role}">
                    {#if msg.role === 'assistant'}
                        <div class="avatar ai">AI</div>
                        <div class="bubble ai-bubble">{@html marked(msg.content)}</div>
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
            <button class="icon-button left-icon-btn" onclick={() => leftIconActive = !leftIconActive} aria-label="Toggle left icon">
                {#if !leftIconActive}
                    <!-- First icon - add your first Iconify icon here -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 8v4l2 2"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"/></g></svg>
                {:else}
                    <!-- Second icon - add your second Iconify icon here -->
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.05 11a8.98 8.98 0 0 1 2.54-5.403M7.904 3.9a9 9 0 0 1 12.113 12.112m-1.695 2.312A9 9 0 0 1 3.55 15m-.5 5v-5h5M3 3l18 18"/></svg>
                {/if}
            </button>

            <!-- INPUT -->
            <input
                id="messageInput"
                type="text"
                placeholder="Message us..."
                bind:value={userInput}
                onkeydown={handleKeydown}
            />

            <!-- RIGHT ICONS CONTAINER -->
            <div class="right-icons-container">
                <button class="icon-button microphone-btn" aria-label="Microphone">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5z"/></svg>
                </button>

                <button class="icon-button voiceover-btn" aria-label="Voice over">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 3a1 1 0 0 1 .993.883L13 4v16a1 1 0 0 1-1.993.117L11 20V4a1 1 0 0 1 1-1M8 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1m8 0a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1M4 9a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1m16 0a1 1 0 0 1 .993.883L21 10v4a1 1 0 0 1-1.993.117L19 14v-4a1 1 0 0 1 1-1"/></g></svg>
                </button>
            </div>

</div>

        </div>

    </div>

    
    <div class="cards-area">
        <div class="card">
            <img src="https://w0.peakpx.com/wallpaper/59/567/HD-wallpaper-web-designing-training-in-pune-web-design-web-design-training-in-pune-website-design-training-web-development-course-in-pune-web-development-training-in-india-website-design-training-in-india.jpg" alt="Website" class="card-image"/>
            <h4>Φτιάξε το δικο σου site</h4>
            <p class="price">ΜΟΝΟ ΜΕ</p>
            <ul>
                <li>250€</li>
            </ul>
            <button>Ενεργοποίηση</button>
        </div>

        <div class="card">
            <img src="https://cdn.thenewstack.io/media/2023/09/94b1d1e3-nextcloud.jpg" alt="Microsoft 365" class="card-image"/>
            <h4>Ακομα εισαι στην microsoft 360;</h4>
            <p class="price">ΜΠΕΣ ΤΩΡΑ ΣΤΟ NEXTCLOUD ΜΕ</p>
            <ul>
                <li>1€</li>
            </ul>
            <button>Δοκιμή 14 ημερών</button>
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #ffffff; /* Light background for black text */
        color: #000000;
    }

    :global(body)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background:
            linear-gradient(90deg, rgba(62, 155, 69, 0.05) 1px, transparent 1px),
            linear-gradient(rgba(62, 155, 69, 0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        z-index: 0;
        animation: gridScroll 20s linear infinite;
    }

    @keyframes gridScroll {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
    }

    .layout-container {
        display: grid;
        grid-template-columns: 260px 1fr 300px;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        position: relative;
        z-index: 1; /* Ensure content is above the grid */
    }    

    /* Burger open */
    .burger {
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
    .active{ 
        left:0;
    }
    


    /* Menu */
    .menu {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 4rem;
    }

    .menu li {
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    color: #374151;
    font-weight: 500;
    transition: all 0.2s;
    }

    .menu li:hover {
    background: #f3f4f6;
    color: #3E9B45;
    }
    
    .chat-area {
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
        /* position: relative; removed to avoid conflict with flex flow if not needed, but can stay. Flex is key */
        color: #000000;
        /* No transition on justify-content needed */
    }

    /* Deleted .chat-area.startup */

    .chat-area h1 {
        font-size: 2.5rem;
        font-weight: 600;
        opacity: 0.9;
        margin-bottom: 40px;
        color: #000000;
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
        transition: flex-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1), padding 0.8s ease; /* Smooth toggle */
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
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .avatar.ai {
        background: #3E9B45;
        color: white;
    }

    .avatar.user {
        background: #EC2025;
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
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
        background: #3E9B45;
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
        position: fixed;
        top: 20px;
        right: 20px;

        display: flex;
        flex-direction: column;
        gap: 16px;

        width: 280px;
        z-index: 1000;
        pointer-events: none; /* Allow scrolling underneath if needed, but cards need pointer events */
    }
    
    .card {
        pointer-events: auto;
        position: relative;
        background: #ffffff;
        border-radius: 18px;
        padding: 20px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-color: #d1d5db;
    }

    /* CARD IMAGE */
    .card-image {
        width: 100%;
        height: 77px;
        object-fit: cover;
        border-radius: 12px;
        margin-bottom: 16px;
        display: block;
    }

    /* ΤΙΤΛΟΣ */
    .card h4 {
        margin: 0 0 6px;
        font-size: 18px;
        font-weight: 700;
        color: #000000;
    }

    /* ΥΠΟΤΙΤΛΟΣ */
    .card .price {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
        color: #3E9B45;
        margin-bottom: 10px;
    }

    /* PRICE VALUE */
    .card ul {
        list-style: none;
        padding: 0;
        margin: 0 0 16px;
    }

    .card ul li {
        font-size: 29px;
        font-weight: 800;
        color: #000000;
    }

    /* BUTTON */
    .card button {
        width: 100%;
        padding: 12px;
        border-radius: 12px;
        border: none;
        font-weight: 700;
        cursor: pointer;
        background: #3E9B45;
        color: white;
        transition: all 0.2s ease;
    }

    .card button:hover {
        background: #15803d;
        transform: none;
        box-shadow: 0 0 15px rgba(62, 155, 69, 0.4);
    }
    .messageBox {
    height: 48px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    }

    .messageBox:focus-within {
    border-color: #3E9B45;
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
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: #7c7c7c;
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
    color:#374151;
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
    color: #3E9B45;
    }

    /* SEND BUTTON */
    #sendButton {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    }

    #sendButton svg {
    height: 18px;
    color: #6b7280;
    transition: color 0.2s;
    }

    #sendButton:hover svg {
    color: #3E9B45;
    }

    #sendButton:disabled svg {
    color: #d1d5db;
    cursor: default;
    }

    @media (max-width: 768px) {

    /* FULLSCREEN SIDEBAR DRAWER (MOBILE) */
    .sidebar {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100vw;
        height: 100vh;
        padding: 24px;
        background: #ffffff;
        border-right: none;
        transition: left 0.35s ease;
        z-index: 1100;
        overflow-y: auto;
        overscroll-behavior: contain;
    }

    /* OPEN STATE */
    .sidebar.active {
        left: 0;
    }

    /* MENU */
    .menu {
        padding-top: 80px;
        gap: 16px;
    }

    .menu li {
        padding: 16px 20px;
        font-size: 18px;
    }

    /* BURGER ALWAYS ON TOP */
    .burger {
        top: 16px;
        left: 16px;
        z-index: 1200;
    }
    .cards-area {
        position: relative;
        width: 100%;
        padding: 0;
        margin-top: 24px;
        margin-bottom: 24px;
        opacity: 0;
        max-height: 0;
        overflow: hidden;
        transform: translateY(-10px);
        transition:
            opacity 0.25s ease,
            transform 0.25s ease,
            max-height 0.35s ease;
        pointer-events: none;
        /* position: static; */

        /* pointer-events: auto; */
    }

    /* SHOW CARDS WHEN MENU IS OPEN */
    .cards-area.card-active {
        opacity: 1;
        max-height: 1000px; /* enough for cards */
        transform: translateY(0);
        pointer-events: auto;
    }

    /* CARD SPACING */
    .card {
        margin-bottom: 16px;
    }

    .layout-container {
        display: grid;
        grid-template-columns: 1fr 4fr;
        grid-template-rows: 1fr 6fr 4fr 1fr;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    /* CHAT */
    .chat-area {
        height: 100vh;
        padding-top: 72px; /* space for burger + logo */
        overflow: hidden;
    }

    /* TITLE */
    .chat-area h1 {
        margin-top: 0;
        margin-bottom: 12px;
        font-size: 1.4rem;
        text-align: center;
        padding: 0 16px;
    }

    /* MESSAGES SCROLL AREA */
    .messages-container {
        flex: 1;
        width: 100%;
        max-width: 100%;
        overflow-y: auto;
        padding: 0 12px 140px; /* bottom space for input */
        -webkit-overflow-scrolling: touch;
    }

    /* INPUT BAR */
    .input-area {
        width: 100%;
        left: 0;
        padding: 12px;
        background: linear-gradient(
            to top,
            rgba(255,255,255,0.98),
            rgba(255,255,255,0.9),
            rgba(255,255,255,0)
        );
    }

    .input-wrapper {
        max-width: 100%;
        border-radius: 16px;
    }

    .input-wrapper input {
        font-size: 16px; /* prevents iOS zoom */
    }

    /* CARDS (DESKTOP POSITION DISABLED) */
    .cards-area {
        position: static;
        width: 100%;
        pointer-events: auto;
    }
    .logo {
        display: flex;
        justify-content: center;
        margin-top: 72px; /* below burger */
        margin-bottom: 12px;
    }

    .img {
        height: 36px;
        width: auto;
    }
}

</style>
