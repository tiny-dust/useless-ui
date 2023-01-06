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
  NButton,
  NTab,
  NCode,
  NCard,
  NScrollbar,
  NIcon,
  NTooltip,
  NTabs
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
    NAnchorLink,
    NButton,
    NTab,
    NCode,
    NScrollbar,
    NCard,
    NIcon,
    NTooltip,
    NTabs,
    NLoadingBarProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider
  ]
})

const setupNaive = (app: App): void => {
  app.use(naive)
}

export default setupNaive
