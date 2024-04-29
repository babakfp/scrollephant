import svelteRetag from "svelte-retag"

import {
    Scrollephant,
    ScrollephantArrowNext,
    ScrollephantArrowPrev,
    ScrollephantDots,
    ScrollephantNavigationsWrapper,
    ScrollephantSection,
    ScrollephantWrapper,
} from "./index.ts"

svelteRetag({
    component: Scrollephant,
    tagname: "scrollephant-root",
    attributes: true,
})

svelteRetag({
    component: ScrollephantArrowNext,
    tagname: "scrollephant-arrow-next",
    attributes: true,
})

svelteRetag({
    component: ScrollephantArrowPrev,
    tagname: "scrollephant-arrow-prev",
    attributes: true,
})

svelteRetag({
    component: ScrollephantDots,
    tagname: "scrollephant-dots",
    attributes: true,
})

svelteRetag({
    component: ScrollephantNavigationsWrapper,
    tagname: "scrollephant-navigations-wrapper",
    attributes: true,
})

svelteRetag({
    component: ScrollephantSection,
    tagname: "scrollephant-section",
    attributes: true,
})

svelteRetag({
    component: ScrollephantWrapper,
    tagname: "scrollephant-wrapper",
    attributes: true,
})
