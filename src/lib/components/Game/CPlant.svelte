<script lang="ts">
  import type { Plant } from "../../GameState/Plant.svelte";
  import CGridObject from "./CGridObject.svelte";
  import SvgPlantBasic from "./SVGPlantBasic.svelte";
  import SvgPlantLBush from "./SVGPlantLBush.svelte";

  interface Props {
    obj: Plant;
  }
  let { obj }: Props = $props();
  function getPlant() {
    switch (obj.plantName) {
      case "basic": {
        return SvgPlantBasic;
      }
      case "bush": {
        return SvgPlantLBush;
      }
    }
  }
</script>

<CGridObject gridObject={obj}>
  <svelte:component this={getPlant()}></svelte:component>
</CGridObject>

<style>
</style>
