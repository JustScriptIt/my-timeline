<template>
    <div class="footer">
        <div class="container footer__container">
            <a href="https://github.com/Kir2410">
                <img
                    class="footer__logo"
                    src="../assets/my-logo.png"
                    alt="logo"
                >
            </a>
            <span>
                Задание выполнил<br/>
                Коршунов Кирилл<br/>
                г.Томск
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style lang="scss" scoped>
.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;

    &__container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__logo {
        height: 30px;
        width: 30px;
    }

    & span {
        margin-left: 30px;
        text-align: center;
        font-size: 12px;
        color: #292D2D;
    }
}
</style>