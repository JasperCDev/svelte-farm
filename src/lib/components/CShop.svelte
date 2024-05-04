<script lang="ts">
  import type { Shop } from "../GameState/Shop.svelte";
  import CGridObject from "./CGridObject.svelte";

  interface Props {
    obj: Shop;
  }
  let { obj }: Props = $props();
</script>

<CGridObject gridObject={obj} handleClick={() => alert("shop")}>
  <div class="shop">
    <h1>Shop</h1>
  </div>
</CGridObject>

<style>
  .shop {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #a66117;
  }
</style>
