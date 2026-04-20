<script lang="ts">
import { onMount, tick } from "svelte";
import Icon from "@iconify/svelte";
import { marked } from "marked";
import { page } from "$app/state";
import type { ChatService } from "./chat";

type ChatArea = {
    floating: boolean;
    chatService: ChatService;
    translations?: any;
    lang?: string;
    info?: string;
    button_title?: string;
    place_holder?: string;
    pills?: string[];
}

let chatContainer: HTMLElement;
let messageInputel: HTMLTextAreaElement;
let messages: {role: string, content: string, isGreeting?: boolean}[] = $state([]);
let userInput = $state("");
let isGenerating = $state(false);
let isOpen = $state(false); // For floating view


let { 
    floating = false, 
    chatService, 
    translations, 
    lang,
    info = "",
    button_title = "",
    place_holder = "",
    pills =[]
}: ChatArea = $props(); 

// Derived translations
const chatTrans = $derived(translations[lang || "en"]?.chat || {});

function autoResize(e: any) {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 240) + "px"; // cap height
}

function loadMessages() {
    if (typeof localStorage === "undefined") return;
    const saved = localStorage.getItem("chat_history");
    if (saved) {
        messages = JSON.parse(saved);
        if (messages.length > 0 && messages[0].role === "assistant") {
            messages[0].isGreeting = true;
        }
    } else {
        messages = [{ role: "assistant", content: chatTrans.greeting || "Hello!", isGreeting: true }];
    }
}

async function sendMessage() {
    if (!userInput.trim() || isGenerating) return;

    const originalInput = userInput;
    userInput = "";
    isGenerating = true;
    const userMsg = { role: "user", content: originalInput };
    messages = [...messages, userMsg];
    const aiMsg = { role: "assistant", content: "" };
    messages = [...messages, aiMsg];
    let responseContent = "";
    let messageToSend = originalInput;
    if (floating) {
        const url = page.url.href;
        const prefix = lang === "el" 
            ? `βρίσκομαι στην σελίδα ${url}` 
            : `i currently browse ${url}`;
        messageToSend = `${prefix}\n\n${originalInput}`;
    }

    // Start streaming
    try {
        await chatService.sendMessage(messageToSend, (chunk: string) => {
            responseContent += chunk;
            messages[messages.length - 1].content = responseContent;
            scrollToBottom();
        });
    } catch (e) {
        console.error("Chat error:", e);
    } finally {
        isGenerating = false;
        setTimeout(() => messageInputel?.focus(), 50);
    }
}

function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function clearChat() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("chat_history");
        localStorage.removeItem("chat_session_id");
        messages = [{ role: "assistant", content: chatTrans.greeting || "Hello!", isGreeting: true }];
    }
}

function scrollToBottom() {
    if (chatContainer) {
        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 0);
    }
}

function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
        setTimeout(() => {
            scrollToBottom();
            messageInputel?.focus();
        }, 300); // Wait for animation
    }
}

onMount(() => {
    if (typeof localStorage !== "undefined") {
        loadMessages();
    }
});

$effect(() => {
    if (typeof localStorage !== "undefined") {
        if (messages.length > 0) {
            localStorage.setItem("chat_history", JSON.stringify(messages));
            scrollToBottom();
        }
    }
});

let promptPills = $derived(
    Array.from(new Set((pills && pills.length) ? pills : (chatTrans?.prompt_pills || [])))
);

function usePrompt(prompt: string) {
    userInput = prompt;
    tick().then(() => {
        sendMessage();
    });
}

</script>

<div class="chat-wrapper" class:floating={floating} class:open={isOpen}>
    {#if floating}
        <button class="chat-trigger" onclick={toggleChat} aria-label="Toggle chat">
            <Icon icon={isOpen ? "material-symbols:close-rounded" : "streamline-sharp:chat-bubble-typing-oval"} width="34" height="34" />
        </button>
    {/if}

    <div class="chat-container-inner" class:full={!floating}>
        {#if floating}
            <div class="floating-header">
                <div class="header-info">
                    <img src="/stolonas-thumb.png" alt="Stolonas" class="header-avatar" />
                    <span>{chatTrans.ai_name || "Stolonas"}</span>
                </div>
                <button class="close-btn" title={chatTrans.close_chat || "Close chat"} onclick={() => isOpen = false}>
                    <Icon icon="material-symbols:close-rounded" />
                </button>
            </div>
        {/if}

        <div class="messages-container" bind:this={chatContainer} class:startup={messages.length <= 1 && !floating}>
            {#each messages as msg}
                <div class="message {msg.role}">
                    <div class="message-wrapper">
                        {#if msg.role === "assistant"}
                            <div class="avatar ai">
                                <img src="/stolonas-thumb.png" alt="AI Agent" />
                            </div>
                            <div class="bubble ai-bubble">
                                <div class="message-info">
                                    {chatTrans.ai_name || "Stolonas"}
                                </div>
                                <div class="message-content">
                                    {#if msg.isGreeting}
                                        {@html marked(chatTrans.greeting || "Hello!")}
                                    {:else if msg.content && msg.content.length}
                                        {@html marked(msg.content)}
                                    {:else}
                                        <Icon icon="svg-spinners:3-dots-bounce" />
                                    {/if}
                                </div>
                            </div>
                        {:else}
                            <div class="bubble user-bubble">
                                <div class="message-content">{msg.content}</div>
                            </div>
                            <div class="avatar user">
                                <span><Icon icon="material-symbols:person-rounded" width="24" height="24" /></span>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}

            {#if messages.length <= 1 && promptPills?.length}
            <div class="prompt-carousel">
                <div class="prompt-track">
                    {#each promptPills as pill}
                        <button
                            class="prompt-pill"
                            onclick={() => usePrompt(pill)}
                        >
                            {pill}
                        </button>
                    {/each}
                </div>
            </div>
            {/if}
        </div>

        <div class="input-area">
            <div class="input-wrapper messageBox">
                <button
                    class="icon-button left-icon-btn"
                    onclick={clearChat}
                    title={chatTrans.new_chat || "Clear chat"}
                    aria-label={chatTrans.new_chat || "Clear chat"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path d="M3 6h18" /><path
                            d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                        /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg
                    >
                </button>         
                <textarea
                    id="messageInput"
                    rows="1"
                    title={chatTrans.placeholder || place_holder || "Type your message..."}
                    placeholder={messages.length > 1 ? (chatTrans.placeholder2 || place_holder) : (chatTrans.placeholder || place_holder)}
                    bind:value={userInput}
                    bind:this={messageInputel}
                    onkeydown={(e) => handleKeydown(e)}
                    oninput={(e) => autoResize(e)}
                ></textarea>
                <div class="right-icons-container">
                    <button type="button" class="icon-button" title="Microphone">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            ><path
                                fill="currentColor"
                                d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5z"
                            /></svg
                        >
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Base Styles */
    .chat-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .chat-container-inner {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: transparent;
    }

    /* Full View specific */
    .chat-container-inner.full {
        align-items: center;
    }

    /* Floating View specific */
    .chat-wrapper.floating {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: auto;
        height: auto;
        z-index: 1000;
        align-items: flex-end;
    }

    .chat-wrapper.floating .chat-container-inner {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 600px;
        max-height: calc(100vh - 120px);
        max-height: calc(100dvh - 120px);
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
    }

    .chat-wrapper.floating.open .chat-container-inner {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
    }

    .chat-trigger {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--brand);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px var(--brand-glow);
        transition: transform 0.2s;
    }

    .chat-trigger:hover {
        transform: scale(1.05);
    }

    .floating-header {
        padding: 12px 16px;
        background: var(--brand);
        color: rgb(0, 0, 0);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-info {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
    }

    .header-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: white;
    }

    .close-btn {
        background: transparent;
        border: none;
        color: rgb(0, 0, 0);
        cursor: pointer;
        padding: 4px;
        display: flex;
        opacity: 0.8;
    }

    .close-btn:hover {
        opacity: 1;
    }

    /* Shared Chat Styles */
    .messages-container {
        flex-grow: 1;
        width: 100%;
        max-width: 800px;
        overflow-y: auto;
        padding: 20px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        transition: flex-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        min-height: 0;
        scrollbar-width: none;
    }
    .messages-container::-webkit-scrollbar { display: none; }

    .startup {
        flex-grow: 0.0001;
        padding-top: 35px;
    }

    .message {
        display: flex;
        width: 100%;
        animation: messageFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes messageFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .message.user { justify-content: flex-end; }
    .message-wrapper { display: flex; gap: 12px; max-width: 85%; align-items: flex-end; }
    
    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        overflow: hidden;
        border: 2px solid var(--border);
    }
    .avatar.ai { background: var(--card-bg); border-color: var(--brand); }
    .avatar.ai img { width: 100%; height: 100%; object-fit: cover; }
    .avatar.user { background: linear-gradient(135deg, #ec2025, #991b1b); color: white; }

    .bubble { padding: 10px 14px; border-radius: 18px; font-size: 15px; line-height: 1.5; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); }
    .ai-bubble { 
        background: var(--bubble-ai-bg); 
        border: 1px solid var(--bubble-ai-border); 
        color: var(--bubble-ai-text); 
        border-bottom-left-radius: 4px; 
    }
    .user-bubble { 
        background: var(--brand); 
        color:black; 
        border-bottom-right-radius: 4px; 
    }

    .message-info { font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 2px; opacity: 0.7; }
    .message-content :global(p) { margin-bottom: 0.5rem; }
    .message-content :global(p:last-child) { margin-bottom: 0; }

    /* ===== Infinite Horizontal Prompt Carousel ===== */

    .prompt-carousel {
        width: 100%;
        max-width: 768px;
        margin: 18px auto 18px auto;
        padding: 0 16px;
        position: relative;
    }
        .prompt-track {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding-top: 1rem;
    }


    .prompt-pill {
        flex: 0 1 auto;
        background: var(--card-bg);
        border: 1.5px solid var(--border);
        color: var(--text);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        text-align: center;
        line-height: 1.3;
        letter-spacing: 0.01em;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        cursor: pointer;
        transition: all 0.2s cubic-bezier(.4,1,.7,1);
        background-clip: padding-box;
    }

    .prompt-pill:hover {
        border-color: var(--brand);
        color: var(--brand);
        background: var(--btn-hover);
        box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        transform: translateY(-2px) scale(1.04);
    }

    .prompt-carousel:hover .prompt-track {
        animation-play-state: paused;
    }

    @keyframes promptScroll {
        0% {
            transform: translate3d(0, 0, 0);
        }
        100% {
            transform: translate3d(-50%, 0, 0);
        }
    }


    
    
    .input-area {
        width: 100%;
        padding: 16px;
        display: flex;
        justify-content: center;
        flex-shrink: 0;
        box-sizing: border-box;
        margin-top: auto;
    }

    .input-wrapper.messageBox {
        width: 100%;
        max-width: 768px;
        background: var(--input-bg);
        border-radius: 12px;
        border: 1px solid var(--border);
        display: flex;
        align-items: flex-end;
        padding: 6px 10px;
        gap: 6px;
    }

    #messageInput {
        flex: 1;
        min-height: 36px;
        max-height: 200px;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text);
        font-size: 15px;
        line-height: 1.4;
        resize: none;
        padding: 8px 0;
    }

    .icon-button {
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: var(--text-muted);
        transition: all 0.2s;
    }
    .icon-button:hover { background: var(--btn-hover); color: var(--brand); }

    @media (max-width: 600px) {
        .chat-wrapper.floating .chat-container-inner {
            width: calc(100vw - 20px);
            right: -10px;
            bottom: 70px;
        }
    }
</style>