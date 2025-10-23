import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 按需引入 Vant 组件
import {
    Button,
    Form,
    Field,
    CellGroup,
    Toast,
    NavBar,
    Search,
    List,
    Cell,
    PullRefresh,
    Tabbar,
    TabbarItem,
    Dialog
} from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(router)

// 注册使用的组件
app.use(Button)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(Toast)
app.use(NavBar)
app.use(Search)
app.use(List)
app.use(Cell)
app.use(PullRefresh)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Dialog)

app.mount('#app')
