<script>
    let activeMenu=$state(false)
</script>
<div class="layout-container">
<div class="drawer">

    <!-- Burger open -->
    <button class="burger" on:click={()=>activeMenu=!activeMenu}>
        {#if activeMenu}
           <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><!-- Icon from Myna UI Icons by Praveen Juge - https://github.com/praveenjuge/mynaui-icons/blob/main/LICENSE --><path fill="currentColor" d="M6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586z"/></svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"/></svg>
        {/if}
    </button>

    <!-- Sidebar -->
    <aside class="sidebar" class:active={activeMenu}>

        <ul class="menu">
            <li>Stolon Edu</li>
            <li>Stolon Marketing</li>
            <li>Stolon Business</li>
            <li>Stolon Computerization</li>
        </ul>

    </aside>

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
    <div class="chat-area"></div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .layout-container {
        
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
    }

    .drawer {
        background-color: #f0f0f0;
        border-right: 1px solid #ccc;
    }

    #drawer-toggle {
    display: none;
    }

    /* Burger open */
    .burger {
    position: fixed;
    top: 16px;
    left: 16px;
    font-size: 2rem;
    background: #202123;
    color: white;
    padding: 1px 2px;
    border-radius: 6px;
    cursor: pointer;
    z-index: 1001;
    }

    /* Sidebar drawer */
    .sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    width: 280px;
    height: 100%;
    background: #202123;
    color: white;
    padding: 20px;
    transition: left 0.35s ease;
    z-index: 1000;
    }

    /* Open drawer */
    .active{ 
    left:0;
    }
    

    /* Burger inside drawer (close) */
    .burger-menu {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    margin-bottom: 30px;
    }

    /* Menu */
    .menu {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-top: 3rem;
    }

    .menu li {
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    
    }

    .menu li:hover {
    background: #2a2b32;
    }

    .chat-area {
        background-color: #ffffff;
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
}
/* ΚΑΡΤΑ */
.card {
    position: relative;
    background: linear-gradient(135deg, #ffffff, #f8fafc);
    border-radius: 18px;
    padding: 20px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.18);
}

/* ΤΙΤΛΟΣ */
.card h4 {
    margin: 0 0 6px;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
}

/* ΥΠΟΤΙΤΛΟΣ */
.card .price {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #219903;
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
    color: #111827;
}

/* BUTTON */
.card button {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: none;
    font-weight: 700;
    cursor: pointer;
    background: linear-gradient(135deg,#7ff163, #5ddf3d);
    color: rgb(0, 0, 0);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card button:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 20px #33c00f;
}
</style>
