<div class="layout-container">
    <div class="drawer"></div>
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
        display: grid;
        grid-template-columns: 260px 1fr 300px;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
    }

    .drawer {
        background-color: #f0f0f0;
        border-right: 1px solid #ccc;
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
