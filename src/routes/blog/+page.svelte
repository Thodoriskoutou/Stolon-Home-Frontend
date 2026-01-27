<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();


</script>

<div class="container">
    <div class="blog-grid" id="blogGrid">
        {#each data.records as post}
             <div class="blog-card">
                    <div class="card-image"><img src={post.image} alt={post.title}></div>
                    <div class="card-content">
                        <!-- <div class="card-date">${post.date}</div> -->
                        <h2 class="card-title">{post.title}</h2>
                        <p class="card-excerpt">{post.desc}</p>
                        <div class="card-tags">
                        </div>
                        <a href={`/blog/${post.slug}`} class="read-more">Read More →</a>
                    </div>
                </div>
        {/each}
    </div>
</div>


<style>


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

.container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

header {
    text-align: center;
    margin-bottom: 60px;
    padding: 20px 0;
}

h1 {
    font-size: 3.5em;
    margin: 0 0 10px 0;
    color: #000000;
    font-weight: 700;
}

.tagline {
    font-size: 1.2em;
    color: #7E1416;
    font-weight: 400;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
}

.blog-card {
    background: #ffffff;
    border: 2px solid #000000;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 4px 4px 0 #000000;
}

.blog-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000000;
}

.card-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #3E9B45 0%, #7E1416 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
    color: #ffffff;
}

.card-content {
    padding: 25px;
}

.card-date {
    font-size: 0.85em;
    color: #7E1416;
    font-weight: 600;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.card-title {
    font-size: 1.5em;
    font-weight: 700;
    margin: 0 0 15px 0;
    color: #000000;
}

.card-excerpt {
    font-size: 1em;
    line-height: 1.6;
    color: #333333;
    margin-bottom: 20px;
}

.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
}

.tag {
    background-color: #3E9B45;
    color: #ffffff;
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: 600;
}

.read-more {
    display: inline-block;
    padding: 10px 25px;
    background-color: #ED2024;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    border-radius: 4px;
    transition: all 0.3s ease;
    border: 2px solid #ED2024;
}

.read-more:hover {
    background-color: #ffffff;
    color: #ED2024;
}

@media (max-width: 768px) {
    h1 {
        font-size: 2.5em;
    }

    .blog-grid {
        grid-template-columns: 1fr;
    }
}
</style>