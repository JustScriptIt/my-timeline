<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "MyButton"
}
</script>

<style lang="scss" scoped>
button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 50px;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 10px;
    background: #292D2D;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: .2s;

    &:hover {
        background: none;
        color: #292D2D;
    }
}
</style>