<template>
  <transition name="viewer-fade">
    <div
      tabindex="-1"
      ref="el-image-viewer__wrapper"
      class="el-image-viewer__wrapper"
      :style="{ 'z-index': zIndex }"
    >
      <div class="el-image-viewer__mask" @click.self="handleMaskClick"></div>
      <!-- CLOSE -->
      <span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
        <i class="el-icon-close"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span class="el-image-viewer__btn el-image-viewer__prev" @click="prev">
          <i class="el-icon-arrow-left" />
        </span>
        <span class="el-image-viewer__btn el-image-viewer__next" @click="next">
          <i class="el-icon-arrow-right" />
        </span>
      </template>
      <!-- ACTIONS -->
      <div class="el-image-viewer__btn el-image-viewer__actions">
        <div class="el-image-viewer__actions__inner">
          <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
          <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i :class="mode.icon" @click="toggleMode"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i
            class="el-icon-refresh-left"
            @click="handleActions('anticlocelise')"
          ></i>
          <i
            class="el-icon-refresh-right"
            @click="handleActions('clocelise')"
          ></i>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="el-image-viewer__canvas">
        <template v-for="(urlObj, i) in imageList" :key="urlObj.name">
          <div class="img_warpper">
            <div class="image-title" :class="[i ? 'right_1' : 'left']">
              {{ urlObj.name }}
            </div>
            <el-img
              ref="img"
              class="el-image-viewer__img"
              :src="urlObj.url"
              :style="imgStyle"
              @load="handleImgLoad"
              @error="handleImgError"
              @mousedown="handleMouseDown"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-img>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { on, off } from "element-plus/dist/utils/dom";
import a from "element-plus/"
import { rafThrottle, isFirefox } from "element-plus/src/utils/util";
import ElImg from "element-plus/packages/image";
import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
const Mode = {
  CONTAIN: {
    name: "contain",
    icon: "el-icon-full-screen",
  },
  ORIGINAL: {
    name: "original",
    icon: "el-icon-c-scale-to-original",
  },
};

const mousewheelEventName = isFirefox() ? "DOMMouseScroll" : "mousewheel";
interface IProps {
  imageList: any;
  zIndex: number;
  initialIndex: number;
  appendToBody: boolean;
  props.maskClosab;
}
const props = defineProps<IProps>();
const emits = defineEmits<{ (e: "onSwitch"): void; (e: "onCLose"): void }>();
withDefaults(props, {
  imageList: [],
  zIndex: 2000,
  initialIndex: 0,
  appendToBody: true,
  props.maskClosa});

const index = ref(props.initialIndex);
const isShow = ref(false);
const infinite = ref(true);
const loading = ref(false);
const mode = Mode.CONTAIN;
const transform = reactive({
  scale: 1,
  deg: 0,
  offsetX: 0,
  offsetY: 0,
  enableTransition: false,
});

const currUrlList = computed(() => props.imageList);
const isSingle = computed(() => props.imageList.length <= 1);
const isFirst = computed(() => index.value === 0);
const isLast = computed(() => index.value === props.imageList.length - 1);
const currentImg = computed(() => props.imageList[index.value]);
const imgStyle = computed(() => {
  const { scale, deg, offsetX, offsetY, enableTransition } = transform;
  // 将margin改成transform
  const style:any = {
    transform: `scale(${scale}) translateX(${offsetX}px) translateY(${offsetY}px) rotate(${deg}deg)`,
    transition: enableTransition ? "transform .3s" : "",
    // 'margin-left': `${offsetX}px`,
    // 'margin-top': `${offsetY}px`,
  };
  if (mode === Mode.CONTAIN) {
    style.maxWidth = style.maxHeight = "100%";
  }
  return style;
});


let hide = () => {
      deviceSupportUninstall();
      onClose();
    },
   let _keyDownHandler:any = null
  let _mouseWheelHandler:any = null
 const   deviceSupportInstall = () => {
       _keyDownHandler = rafThrottle((e:any) => {
        const keyCode = e.keyCode;
        switch (keyCode) {
          // ESC
          case 27:
            hide();
            break;
          // SPACE
          case 32:
            toggleMode();
            break;
          // LEFT_ARROW
          case 37:
            prev();
            break;
          // UP_ARROW
          case 38:
            handleActions("zoomIn");
            break;
          // RIGHT_ARROW
          case 39:
            next();
            break;
          // DOWN_ARROW
          case 40:
            handleActions("zoomOut");
            break;
        }
      });
       _mouseWheelHandler = rafThrottle((e:any) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          handleActions("zoomIn", {
            zoomRate: 0.015,
            enableTransition: false,
          });
        } else {
          handleActions("zoomOut", {
            zoomRate: 0.015,
            enableTransition: false,
          });
        }
      });
      on(document, "keydown", _keyDownHandler);
      on(document, mousewheelEventName, _mouseWheelHandler);
    },
    const deviceSupportUninstall = () => {
      off(document, "keydown", _keyDownHandler);
      off(document, mousewheelEventName, _mouseWheelHandler);
      _keyDownHandler = null;
      _mouseWheelHandler = null;
    },
    const handleImgLoad = (e:any) => {
      loading.value = false;
    },
    const handleImgError =(e:any) => {
      loading.value = false;
      e.target.alt = "加载失败";
    },
    let _dragHandler:any = null
    const handleMouseDown = (e:any) => {
      if (loading.value || e.button !== 0) return;
      const { offsetX, offsetY } = transform;
      const startX = e.pageX;
      const startY = e.pageY;
      _dragHandler = rafThrottle((ev:any) => {
        transform.offsetX = offsetX + ev.pageX - startX;
        transform.offsetY = offsetY + ev.pageY - startY;
      });
      on(document, "mousemove", _dragHandler);
      on(document, "mouseup", (ev:any) => {
        off(document, "mousemove", _dragHandler);
      });
      e.preventDefault();
    },
    const handleMaskClick = ()=> {
      if (props.maskClosable) {
        hide();
      }
    },
    const reset = () =>{
      transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      };
    },
    const toggleMode =() => {
      if (this.loading) return;

      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const index = modeValues.indexOf(this.mode);
      const nextIndex = (index + 1) % modeNames.length;
      this.mode = Mode[modeNames[nextIndex]];
      this.reset();
    },
   const prev=() =>{
      if (this.isFirst && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index - 1 + len) % len;
    },
    const next = () => {
      if (this.isLast && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index + 1) % len;
    },
    const handleActions =(action, options = {}) => {
      if (this.loading) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options,
      };
      const { transform } = this;
      switch (action) {
        case "zoomOut":
          if (transform.scale > 0.2) {
            transform.scale = parseFloat(
              (transform.scale - zoomRate).toFixed(3)
            );
          }
          break;
        case "zoomIn":
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case "clocelise":
          transform.deg += rotateDeg;
          break;
        case "anticlocelise":
          transform.deg -= rotateDeg;
          break;
      }
      transform.enableTransition = enableTransition;
    },


watch(index,(val) => {
  this.reset();
        this.onSwitch(val);
})
watch(currentImg,() => {
  this.$nextTick((_) => {
        const $img = this.$refs.img[0];
        if (!$img.complete) {
          this.loading = true;
        }
      });
})
onMounted(() => {
  deviceSupportInstall();
    if (props.appendToBody) {
      // document.body.appendChild(this.$el);
    }
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    // this.$refs["el-image-viewer__wrapper"].focus();
})
onUnmounted(() => {
  if (props.appendToBody && props.$el && props.$el.parentNode) {
      props.$el.parentNode.removeChild(props.$el);
    }
})
</script>
<style lang="less" scoped>
.el-image-viewer__canvas {
  display: flex;
  justify-content: space-around;
  max-height: 100vh;
  > .img_warpper {
    flex: 1;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
  }
}
.el-image-viewer__img {
  border: 1px solid #ccc;
  height: 100%;
}
.image-title {
  position: fixed;
  top: 100px;
  font-size: 15px;
  color: #ffffff;
  z-index: 2001;
  background: #606266;
  padding: 10px 20px;
  border-radius: 10px;
  &.left {
    left: 40px;
  }
}
.right_1 {
  right: 40px;
}
</style>
