<template>
    <div class="holy-grail">
        <header class="app-header">
            <div class="container">
                <nav>
                    <ul class="app-nav split-navigation">
                        <li class="split-navigation__item">
                            <router-link to="/">
                                <img src="/vite.svg" class="logo" alt="Vite logo" />
                            </router-link>
                        </li>
                        <li class="split-navigation__item">
                            <router-link to="/">Home</router-link>
                        </li>
                        <li class="split-navigation__item">
                            <router-link to="/examples">Examples</router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <main class="holy-grail__main">
            <!-- Left sidebar -->
            <aside class="holy-grail__left"></aside>

            <!-- Main content -->
            <article class="holy-grail__middle">
                <router-view></router-view>
            </article>

            <!-- Right sidebar -->
            <nav class="holy-grail__right">
                <ul class="sidebar-nav">
                    <li><router-link to="/todo">Todo</router-link></li>
                    <li><router-link to="/pinia">Pinia</router-link></li>
                    <li><router-link to="/countdown">Countdown</router-link></li>
                </ul>
            </nav>
        </main>
        <footer class="app-footer">
            <div class="container">
                <div class="copyright">© 2024 — present Weijuer. All rights reserved.</div>
            </div>
        </footer>
    </div>
</template>

<style>
/* .sidebar-nav {
    li:not(:last-child) {
        a {
            view-transition-name: auto;
        }
    }
}

::view-transition-old(posts-nav) {
    animation: fade 0.2s linear forwards;
    height: 100%;
}

::view-transition-new(posts-nav) {
    animation: fade 0.3s linear reverse;
    height: 100%;
}

@keyframes fade {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-100%);
    }
} */

/* @keyframes fade-in {
    from {
        opacity: 0;
    }
}

@keyframes fade-out {
    to {
        opacity: 0;
    }
}

@keyframes slide-from-right {
    from {
        transform: translateX(30px);
    }
}

@keyframes slide-to-left {
    to {
        transform: translateX(-30px);
    }
}

::view-transition-old(root) {
    animation:
        90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
        300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
    animation:
        210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
        300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
} */
</style>

<style scoped lang="less">
.holy-grail {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;

    .holy-grail__main {
        /* Take the remaining height */
        flex-grow: 1;

        /* Layout the left sidebar, main content and right sidebar */
        display: flex;
        flex-direction: row;
    }

    .holy-grail__left {
        width: 25%;
    }

    .holy-grail__middle {
        /* Take the remaining width */
        flex-grow: 1;
    }

    .holy-grail__right {
        width: 20%;
    }
}

.app-header {
    --w-header-height: 64px;
    position: sticky;
    top: 0;

    height: var(--w-header-height);
    padding: 0 40px;
    line-height: 64px;
    background: #f0f2f5;
}

.app-main {
    flex: auto;
    min-height: 0;
}

.app-footer {
    --w-footer-height: 24px;

    flex: 0 0 auto;
    padding: 24px 50px;
    height: var(--w-footer-height);
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    background: #f0f2f5;
}

.split-navigation {
    display: flex;
    align-items: center;
    gap: 1rem;

    margin: 0;
    padding: 0;
    list-style: none;

    li,
    &__item {
        &:first-child {
            margin-right: auto;
        }
    }
}

.logo {
    display: block;
    will-change: filter;
    transition: filter 300ms;

    &:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
}

.copyright {
    display: flex;
    justify-content: center;
}
</style>
