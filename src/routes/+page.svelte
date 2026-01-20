<script>
    import { onMount } from 'svelte';
    import { marked } from 'marked';

    let activeMenu = $state(false);
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
                <li>Stolon Edu</li>
                <li>Stolon Marketing</li>
                <li>Stolon Business</li>
                <li>Stolon Computerization</li>
            </ul>

        </aside>

    </div>


    <div class="chat-area">
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
            <div class="input-wrapper">
                <input 
                    type="text" 
                    placeholder="Message ChatGPT..." 
                    bind:value={userInput} 
                    onkeydown={handleKeydown}
                />
                <button class="send-btn" onclick={sendMessage} disabled={!userInput.trim()} aria-label="Send message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
        </div>

    </div>

    
    <div class="cards-area">
        <div class="card">
            <h4>Φτιάξε το δικο σου site</h4>
            <p class="price">ΜΟΝΟ ΜΕ</p>
            <ul>
                <li>250€</li>
            </ul>
            <button>Ενεργοποίηση</button>
        </div>

        <div class="card">
            <h4>Ακομα εισαι στην microsoft 360;</h4>
            <p class="price">ΜΠΕΣ ΤΩΡΑ ΣΤΟ .... ΜΕ</p>
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
    padding: 12px 16px;
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
        position: relative;
        color: #000000;
    }

    .chat-area h1 {
        margin-top: 160px;
        font-size: 2.5rem;
        font-weight: 600;
        opacity: 0.9;
        margin-bottom: 40px;
        color: #000000;
    }

    .messages-container {
        flex: 1;
        width: 100%;
        max-width: 800px;
        overflow-y: auto;
        padding-bottom: 120px; /* Space for input area */
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-top: 20px;
        
        /* Hide scrollbar */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
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
        position: fixed;
        bottom: 0;
        width: calc(100% - 260px - 300px); /* Adjust based on grid layout */
        padding: 24px;
        background: transparent;
        display: flex;
        justify-content: center;
        pointer-events: none; /* Allow grid to be seen/clicked through where empty */
    }

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
        font-size: 34px;
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
</style>
