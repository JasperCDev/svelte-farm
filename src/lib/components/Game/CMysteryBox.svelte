<script lang="ts">
    import type { MysteryBox } from "../../GameState/MysteryBox.svelte";
    import CGridObject from "./CGridObject.svelte";
    import SVGBox from "./SVGBox.svelte";

    interface Props {
        obj: MysteryBox;
    }
    let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj}>
    <div class="mystery-box">
        <SVGBox />
    </div>
</CGridObject>

<style>
</style>
