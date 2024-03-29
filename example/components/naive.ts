import {
  // create naive ui
  create,
  // component
  NP,
  NH1,
  NH2,
  NH3,
  NText,
  NTable,
  NAnchor,
  NAnchorLink,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NConfigProvider,
  NButton,
  NTab,
  NCode,
  NCard,
  NScrollbar,
  NIcon,
  NTooltip,
  NTabs,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NDivider,
  NDropdown
} from 'naive-ui'
import { App } from 'vue'

const naive = create({
  components: [
    NP,
    NH1,
    NH2,
    NH3,
    NText,
    NTable,
    NAnchor,
    NDropdown,
    NAnchorLink,
    NButton,
    NTab,
    NCode,
    NScrollbar,
    NCard,
    NIcon,
    NTooltip,
    NTabs,
    NMenu,
    NDivider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NLoadingBarProvider,
    NMessageProvider,
    NDialogProvider,
    NConfigProvider,
    NNotificationProvider
  ]
})

const setupNaive = (app: App): void => {
  app.use(naive)
}

export default setupNaive
