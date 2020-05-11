import Vue from 'vue'
import { Form, Button, input, FormItem, Message } from 'element-ui'//登录
import { header, container, aside, main } from 'element-ui'//主页头部
import { menu, submenu, menuItemGroup, menuItem } from 'element-ui'//主页左侧，
import {
    breadcrumb, breadcrumbItem, card, row, col, table,
    tableColumn, Switch, tooltip, pagination, Dialog, MessageBox,tag,tree,select,option
} from 'element-ui'//主页main


Vue.use(Button)
Vue.use(Form)
Vue.use(input)
Vue.use(FormItem)

Vue.use(header)
Vue.use(container)
Vue.use(aside)
Vue.use(main)

Vue.use(menu)
Vue.use(submenu)
Vue.use(menuItemGroup)
Vue.use(menuItem)

Vue.use(breadcrumb)
Vue.use(breadcrumbItem)
Vue.use(card)
Vue.use(row)
Vue.use(col)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(Switch)
Vue.use(tooltip)
Vue.use(pagination)
Vue.use(Dialog)
Vue.use(tag)
Vue.use(option)
Vue.use(select)
Vue.use(tree)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm