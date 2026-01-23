
    <style>
  :global(body) {
        margin: 0;
        padding: 0;
        overflow: auto;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #ffffff; /* Light background for black text */
        color: #000000;
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

        

        .left-panel, .right-panel {
            background-color: rgba(249, 250, 251, 0.8);
            border-right: 1px solid rgba(62, 155, 69, 0.1);
        }

        .right-panel {
            border-right: none;
            border-left: 1px solid rgba(62, 155, 69, 0.1);
        }

        .main-content {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            overflow-y: auto;
        }

        .contact-form-wrapper {
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid rgba(236, 32, 37, 0.2);
            border-radius: 12px;
            padding: 3rem;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .logo {
            display: flex;
            align-items: center;      /* vertical alignment */
            justify-content: space-between; /* symmetrical spacing */
            gap: 1rem;   
            margin-top:1rem;
        }
        .logo img {
            margin-top:-4rem;
        }

        h1 {
            margin: 0 0 0.5rem 0;
            font-size: 2rem;
            color: #1a1a1a;
        }

        .subtitle {
            margin: 0 0 2rem 0;
            color: #666;
            font-size: 0.95rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #333;
            font-size: 0.9rem;
        }

        input, textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid rgba(62, 155, 69, 0.2);
            border-radius: 6px;
            font-family: inherit;
            font-size: 1rem;
            transition: border-color 0.3s, box-shadow 0.3s;
            box-sizing: border-box;
            background-color: #ffffff;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: rgb(62, 155, 69);
            box-shadow: 0 0 0 3px rgba(62, 155, 69, 0.1);
        }

        textarea {
            resize: vertical;
            min-height: 120px;
        }

        button {
            width: 100%;
            padding: 0.875rem;
            background-color: rgb(62, 155, 69);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.1s;
        }

        button:hover {
            background-color: rgb(52, 135, 59);
        }

        button:active {
            transform: scale(0.98);
        }
        footer {
            position: relative;
            z-index: 1;
            background-color: rgba(249, 250, 251, 0.95);
            border-top: 2px solid rgba(62, 155, 69, 0.2);
            padding: 1rem;
            text-align: center;
            grid-column: 1 / -1;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .footer-links a {
            color: #333;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s;
        }

        .footer-links a:hover {
            color: rgb(62, 155, 69);
        }


        .footer-bottom {
            color: #666;
            font-size: 0.85rem;
            margin-top: 2rem;
        }




        @media (max-width: 968px) {
            .layout-container {
                grid-template-columns: 1fr;
            }

            .left-panel, .right-panel {
                display: none;
            }

            .main-content {
                padding: 1rem;
            }

            .contact-form-wrapper {
                padding: 2rem 1.5rem;
            }

            h1 {
                font-size: 1.75rem;
            }
            footer {
            position: relative;
            z-index: 1;
            background-color: rgba(249, 250, 251, 0.95);
            border-top: 2px solid rgba(62, 155, 69, 0.2);
            padding: 2rem;
            text-align: center;
            grid-column: 1 / -1;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .footer-links a {
            color: #333;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s;
        }

        .footer-links a:hover {
            color: rgb(62, 155, 69);
        }

        .footer-bottom {
            color: #666;
            font-size: 0.85rem;
            margin-bottom: 3em;
        }

        @media (max-width: 480px) {

            .main-content {
                padding: 0.75rem;
                align-items: flex-start;
                padding-top: 2rem;
            }

            .contact-form-wrapper {
                padding: 1.5rem 1rem;
            }

            h1 {
                font-size: 1.5rem;
            }

            .subtitle {
                font-size: 0.875rem;
            }

            input, textarea {
                padding: 0.625rem;
                font-size: 0.9375rem;
            }

            button {
                padding: 0.75rem;
                font-size: 0.9375rem;
            }

            .form-group {
                margin-bottom: 1.25rem;
            }
                    
        }
    }
        
    </style>
    <div class="layout-container">
        <div class="left-panel"></div>
        
        <div class="main-content">
            <div class="contact-form-wrapper">
                <div class="logo" style="margin-bottom: 1.5rem;">
                    <!-- Placeholder for Logo -->
                    <h1>Get in Touch</h1>
                    <img src="/StolonLogo.png" alt="Logo" style="height: 150px;">
                </div>
                <p class="subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

                <form method="POST" action="/submit-contact">
                    <div class="form-group">
                        <label for="name">Name *</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject">
                    </div>

                    <div class="form-group">
                        <label for="message">Message *</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>

        <div class="right-panel"></div>
        <footer>
            <div class="footer-content">
                <div class="footer-links">
                    <a href="/about">About</a>
                    <a href="/services">Services</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/contact">Contact</a>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2026 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
