<script lang="ts">
  let activeMenu = $state(false);
	let { children } = $props();
</script>

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
        </aside>
    </div>

{@render children()}

<style>
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
</style>