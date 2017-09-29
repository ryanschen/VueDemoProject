<template>
  <div v-if="_visible" class="alert__container">
    <div @click="close" class="alert__container--mask"></div>
    <div class="alert__container--bd">
      <h1 class="alert__bd--title">{{ title }}</h1>
      <p class="alert__bd--content">{{ content }}</p>
      <div class="alert__bd--footer">
        <a @click="close" class="button">{{ buttonText }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .alert__container {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    &--mask {
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      animation: fadeIn .3s ease;
    }
    &--bd {
      width: 300px;
      background: #fff;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      animation: slide .3s ease;
      .alert__bd--title {
        text-align: left;
        font-size: 1em;
        color: #333;
        font-weight: 500;
        margin: 1em 1em 0;
      }
      .alert__bd--content {
        font-size: 1em;
        margin: 1em;
        text-align: left;
        color: #777;
      }
      .alert__bd--footer {
        padding: 1em;
        .button {
          background: #94A425;
          display: inline-block;
          line-height: 2.2;
          padding: 0 1em;
          border-radius: 2px;
          color: #fff;
        }
      }
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.4);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
</style>

<script>
  export default {
    props: {
      title: String,
      content: String,
      buttonText: {
        type: String,
        default: '确定'
      },
      visible: Boolean
    },
    computed: {
      _visible: {
        get () {
          return this.visible
        },
        set (val) {
          this.$emit('update:visible', val)
        }
      }
    },
    methods: {
      close () {
        this._visible = false
        this.$emit('close')
      }
    }
  }
</script>
