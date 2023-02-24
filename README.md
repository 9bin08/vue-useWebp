# vue-useWebp

by.9veloper in Korea

#### features

    1. if your brower is support in webp plugin is replace [ext] png,jpe?g,gif to webp
    2. is support attr src, background
    3. if your src format is 'data:~' plugin is transform origin src

#### use plugin to Vue

```
import useWebp from 'vue-useWebp';
Vue.use(useWebp);
```

#### in your component

```
<img v-webp="'src'"/>
```

```
<img v-webp="require('src')"/>
```

```

<img v-webp="url"/>
<script>
    export default {
        data() {
            return {
                url: require('src')
            }
        }
    }
</script>
```

```
<div v-webp:bg="require('src')"></div>
```
