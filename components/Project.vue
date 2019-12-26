<template>
  <div
    :class="['project', selected(projectID) ? 'selected' : '']"
    @click="selectProject">

    <div class="overlay"></div>

    <div class="content">
      <div class="title">
        {{ name }}
      </div>
      <div class="description">
        {{ description }}
      </div>
      <div :class="['status-container', slugify(status)]">
        <label class="label">Status</label>
        <div class="status-item-list">
          <div
            v-for="item in statusList"
            :key="slugify(item)"
            :class="['status-item', slugify(item)]">
            {{ item }}
          </div>
        </div>
      </div>
      <div v-if="press" class="press-container">
        <label class="label">Press</label>
        <div class="press-item-list">
          <a
            v-for="item in press"
            :key="slugify(item.link)"
            :href="item.link"
            class="press-item"
            target="_blank">
            <img class="press-logo" :src="item.logo" />
          </a>
        </div>
      </div>
      <div v-if="media" class="media-container">
        <div
          v-for="(item, index) in media"
          :key="item.type + index"
          class="media-item">
          <template v-if="item.type === 'image'">
            <img class="media-image" :src="item.image" />
          </template>
          <template v-if="item.type === 'video'">
            <div class="media-video">
              <iframe
                v-if="parsedVideoUrl(item.video).type === 'youtube'"
                :src="'//www.youtube.com/embed/' + parsedVideoUrl(item.video).id"></iframe>
              <iframe
                v-if="parsedVideoUrl(item.video).type === 'vimeo'"
                :src="'//player.vimeo.com/video/' + parsedVideoUrl(item.video).id"></iframe>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div
      class="bg-img"
      :style="{ backgroundImage: 'url(' + tileImage + ')', backgroundPosition: tileImagePlacement }"></div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      selectedProject: 'posts/selectedProject'
    }),
    metadata () {
      return this.project.metadata
    },
    projectID () {
      return this.project.ID
    },
    name () {
      return this.project.post_title
    },
    description () {
      return this.metadata.description
    },
    tileImage () {
      return this.metadata.tile_image
    },
    tileImagePlacement () {
      return this.metadata.tile_image_placement
    },
    statusList () {
      return ['In Development', 'Complete']
    },
    status () {
      return this.metadata.status
    },
    press () {
      const press = this.metadata.press
      if (press) { return press }
      return false
    },
    media () {
      const media = this.metadata.media
      if (media) { return media }
      return media
    }
  },

  methods: {
    selected (ID) {
      const selected = this.selectedProject
      if (selected === ID) { return true }
      return false
    },
    slugify (text) {
      return this.$dashSlugify(text)
    },
    selectProject () {
      this.$store.dispatch('posts/setSelectedProject', this.projectID)
    },
    parsedVideoUrl (url) {
      return this.$parseVideoUrl(url)
    }
  }
}
</script>

<style lang="scss" scoped>
$w: 1.25rem;

.project {
  position: relative;
  width: calc(33.333% - #{$w}/3);
  height: 100%;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    .overlay {
      transition: 250ms ease-in-out;
      opacity: 0 !important;
    }
  }
  &:not(:last-child) {
    margin-right: $w;
  }
  &.selected {
    cursor: default;
    .overlay,
    .content,
    .bg-img {
      transition: 250ms ease-in-out;
    }
    .overlay {
      opacity: 0 !important;
    }
    .content {
      transform: scale(1);
      opacity: 1;
    }
    .bg-img {
      transform: scale(0.9);
      opacity: 0;
    }
  }
}

.overlay,
.content,
.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 250ms ease-in-out;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.9);
  opacity: 0;
  z-index: 20;
}

.content {
  background-color: $wildSand;
  overflow-y: scroll;
  overflow-x: hidden;
  transform: scale(0.9);
  opacity: 0;
  color: $mineShaft;
  padding: 2rem;
  padding-bottom: 0;
  z-index: 30;
}

.title,
.description {
  white-space: normal;
}

.title {
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1rem;
}

.description,
.press-container {
  margin-bottom: 2rem;
}

.label {
  font-weight: 600;
}

.status-container,
.press-container {
  .label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
  .status-item-list,
  .press-item-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.status-container {
  margin-bottom: 1rem;
  &.in-development .in-development,
  &.complete .complete {
    opacity: 1;
  }
  .status-item {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: white;
    background-color: $mineShaft;
    padding: 0.25rem 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    border-radius: 0.25rem;
    opacity: 0.25;
  }
}

.press-container {
  .press-item {
    margin-right: 1rem;
    margin-bottom: 1rem;
    &:hover {
      .press-logo {
        transition: 250ms;
        transform: scale(0.9);
      }
    }
  }
  .press-logo {
    display: block;
    max-width: 7rem;
    max-height: 2rem;
    transition: 250ms;
  }
}

.media-container {
  .media-item {
    position: relative;
    width: calc(100% + 4rem);
    left: -2rem;
    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }
  .media-image {
    display: block;
    width: 100%;
  }
  .media-video {
    width: 100%;
    height: auto;
    padding-top: 56.2%;
    position: relative;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.bg-img {
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 10;
}
</style>
