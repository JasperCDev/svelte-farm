<script lang="ts">
    interface Props {
        randomWidth: number;
        randomHeight: number;
    }
    // Access the props via $props
    const { randomHeight, randomWidth }: Props = $props();

    const pathLength = 1;

    // Computed values using Svelte 5 reactivity
    const animationDelay = `${Math.random() * 3}s`;
    const animationDuration = `${randomHeight / (window.innerHeight * 0.5)}s`;
    const translateY = `${-(randomHeight * 2)}px`;
    const strokeDasharray = `${25 / randomHeight} ${(randomHeight - 25) / randomHeight}`;

    const d = `M${randomWidth} 0 L${randomWidth} ${randomHeight}`;
</script>

<path
    class="rainDrop"
    {d}
    stroke-dasharray={strokeDasharray}
    {pathLength}
    style="--path-length: {pathLength}; --animation-duration: {animationDuration}; --translate-y: {translateY}; --animation-delay: {animationDelay};"
/>

<style>
    .rainDrop {
        stroke-dashoffset: var(--path-length);
        animation-name: rain;
        animation-duration: var(--animation-duration);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: forwards;
        animation-delay: var(--animation-delay);
        stroke-width: 3;
        stroke: darkturquoise;
        transform: translateY(-10vh);
        stroke-linecap: round;
    }

    @keyframes rain {
        100% {
            stroke-dashoffset: 0;
            stroke-width: 0.5;
        }
    }
</style>
