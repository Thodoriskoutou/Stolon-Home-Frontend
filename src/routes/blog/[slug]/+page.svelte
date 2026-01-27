<script lang="ts">
import type { PageProps } from './$types';

let { data }: PageProps = $props();

const post = data.record;
</script>



<article class="post-container">
    <a href="/blog" class="back-link">← Back to Blog</a>

    <header class="post-header">
        <h1 class="post-title">{post.title}</h1>
        {#if post.date}
            <div class="post-meta">{post.date}</div>
        {/if}
    </header>

    {#if post.image}
        <div class="post-hero">
            <img src={post.image} alt={post.title} />
        </div>
    {/if}

    <div class="post-content">
        {@html post.content}
    </div>
</article>
<style>

:global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #ffffff;
    color: #000000;
}

/* keep your animated grid */
:global(body)::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(90deg, rgba(62,155,69,0.05) 1px, transparent 1px),
        linear-gradient(rgba(62,155,69,0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 0;
    animation: gridScroll 20s linear infinite;
}

@keyframes gridScroll {
    to {
        transform: translate(50px, 50px);
    }
}

.post-container {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 60px 20px 100px;
}

.back-link {
    display: inline-block;
    margin-bottom: 40px;
    font-weight: 600;
    text-decoration: none;
    color: #ED2024;
}

.back-link:hover {
    text-decoration: underline;
}

.post-header {
    margin-bottom: 40px;
}

.post-title {
    font-size: 3em;
    line-height: 1.15;
    margin: 0 0 15px;
    font-weight: 800;
}

.post-meta {
    font-size: 0.9em;
    color: #7E1416;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.post-hero {
    margin: 40px 0 60px;
    border: 3px solid #000;
    box-shadow: 6px 6px 0 #000;
}

.post-hero img {
    width: 100%;
    display: block;
}

.post-content {
    font-size: 1.1em;
    line-height: 1.8;
    color: #222;
}

/* Content typography */
.post-content h2 {
    font-size: 2em;
    margin: 60px 0 20px;
    font-weight: 800;
}

.post-content h3 {
    font-size: 1.4em;
    margin: 40px 0 15px;
    font-weight: 700;
}

.post-content p {
    margin-bottom: 24px;
}

.post-content a {
    color: #ED2024;
    font-weight: 600;
}

.post-content blockquote {
    margin: 40px 0;
    padding: 25px 30px;
    border-left: 6px solid #3E9B45;
    background: #f9f9f9;
    font-style: italic;
}

.post-content pre {
    background: #000;
    color: #fff;
    padding: 20px;
    overflow-x: auto;
    border-radius: 6px;
    margin: 40px 0;
}

/* Mobile */
@media (max-width: 768px) {
    .post-title {
        font-size: 2.2em;
    }
}
</style>