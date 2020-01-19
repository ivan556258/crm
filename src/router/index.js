import Vue from 'vue'
import VueRouter from 'vue-router'
import AppMain from '../views/table/AppMain.vue'
import AppVehicleAll from '../views/table/AppVehicleAll.vue'
import AppVehicleMaintenanceAll from '../views/table/AppVehicleMaintenanceAll.vue'
import AppVehicleSmsAll from '../views/table/AppVehicleSmsAll.vue'
import AppVehicleOwnerAll from '../views/table/AppVehicleOwnerAll.vue'
import AppContractAll from '../views/table/AppContractAll.vue'
import AppUserDriverProfileAll from '../views/table/AppUserDriverProfileAll.vue'
import AppUserProfileAll from '../views/table/AppUserProfileAll.vue'
import AppUserCommentAll from '../views/table/AppUserCommentAll.vue'
import AppUserSmsAll from '../views/table/AppUserSmsAll.vue'
import AppAccountAll from '../views/table/AppAccountAll.vue'
import AppAccountBillAll from '../views/table/AppAccountBillAll.vue'
import AppAccountBillItemAll from '../views/table/AppAccountBillItemAll.vue'
import AppBillAll from '../views/table/AppBillAll.vue'
import AppFineBillGridAll from '../views/table/AppFineBillGridAll.vue'
import AppBillItemRentBillItemGridAll from '../views/table/AppBillItemRentBillItemGridAll.vue'
import AppStockAll from '../views/table/AppStockAll.vue'
import AppStockSupplierAll from '../views/table/AppStockSupplierAll.vue'
import AppStockInvoicePurchaseInvoiceGridAll from '../views/table/AppStockInvoicePurchaseInvoiceGridAll.vue'
import AppStockInvoiceSalesInvoiceGridAll from '../views/table/AppStockInvoiceSalesInvoiceGridAll.vue'
import AppReportsMainReport from '../views/table/AppReportsMainReport.vue'
import AppКeportsVehicleDriverReport from '../views/table/AppКeportsVehicleDriverReport.vue'
import AppReportsVehicleReport from '../views/table/AppReportsVehicleReport.vue'
import AppReportsDriverReport from '../views/table/AppReportsDriverReport.vue'
import AppReportsStockReport from '../views/table/AppReportsStockReport.vue'
import AppReportsAccountReport from '../views/table/AppReportsAccountReport.vue'
import AppGpsMap from '../views/table/AppGpsMap.vue'
import AppUserCompanyBillAll from '../views/table/AppUserCompanyBillAll.vue'
import AppUserCompany from '../views/table/AppUserCompany.vue'
import AppСontentSupport from '../views/table/AppСontentSupport.vue'
import AppVehicleId from '../views/item/AppVehicleId.vue'
import AppUserDriverProfileСreate from '../views/item/AppUserDriverProfileСreate.vue'
import AppVehicleСreate from '../views/item/AppVehicleСreate.vue'
import AppVehicleMaintenanceCreate from '../views/item/AppVehicleMaintenanceCreate.vue'
import AppVehicleOwnerCreate from '../views/item/AppVehicleOwnerCreate.vue'
import AppBillItemRentBillItemFormCreate from '../views/item/AppBillItemRentBillItemFormCreate.vue'
import AppBillItemRentBillItemFormId from '../views/item/AppBillItemRentBillItemFormId.vue'
import AppVehicleOwnerId from '../views/item/AppVehicleOwnerId.vue'
import AppUserDriverProfileId from '../views/item/AppUserDriverProfileId.vue'
import AppVehicleMaintenanceId from '../views/item/AppVehicleMaintenanceId.vue'

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin/main',
      name: 'Главная',
      component: AppMain
    },
    {
      path: '/admin/Vehicle/all',
      name: 'Автомобили',
      component: AppVehicleAll
    },
    {
      path: '/admin/VehicleMaintenance/all',
      name: 'Техобслуживание',
      component: AppVehicleMaintenanceAll
    },
    {
      path: '/admin/VehicleSms/all',
      name: 'Двигатель',
      component: AppVehicleSmsAll
    },
    {
      path: '/admin/VehicleOwner/all',
      name: 'Владельцы',
      component: AppVehicleOwnerAll
    },
    {
      path: '/admin/ContractAll',
      name: 'Договоры аренды',
      component: AppContractAll
    },
    {
      path: '/admin/UserDriverProfile/all',
      name: 'Клиенты',
      component: AppUserDriverProfileAll
    },
    {
      path: '/admin/UserProfile/all',
      name: 'Сотрудники',
      component: AppUserProfileAll
    },
    {
      path: '/admin/UserComment/all',
      name: 'Комментарии',
      component: AppUserCommentAll
    },
    {
      path: '/admin/UserSms/all',
      name: 'История SMS',
      component: AppUserSmsAll
    },
    {
      path: '/admin/Account/all',
      name: 'Счета',
      component: AppAccountAll
    },
    {
      path: '/admin/AccountBill/all',
      name: 'Приход-расход',
      component: AppAccountBillAll
    },
    {
      path: '/admin/AccountBillItem/all',
      name: 'Статьи',
      component: AppAccountBillItemAll
    },
    {
      path: '/admin/Bill/all',
      name: 'Транзакции',
      component: AppBillAll
    },
    {
      path: '/admin/FineBillGrid/all',
      name: 'Неоплаченые штрафы',
      component: AppFineBillGridAll
    },
    {
      path: '/admin/BillItem/RentBillItemGrid/all',
      name: 'Тарифы',
      component: AppBillItemRentBillItemGridAll
    },
    {
      path: '/admin/Stock/all',
      name: 'Номенклатура',
      component: AppStockAll
    },
    {
      path: '/admin/StockSupplier/all',
      name: 'Контрагенты',
      component: AppStockSupplierAll
    },
    {
      path: '/admin/StockInvoice/PurchaseInvoiceGrid/all',
      name: 'Накладные приходные',
      component: AppStockInvoicePurchaseInvoiceGridAll
    },
    {
      path: '/admin/StockInvoice/SalesInvoiceGrid/all',
      name: 'Накладные расходные',
      component: AppStockInvoiceSalesInvoiceGridAll
    },
    {
      path: '/admin/reports/MainReport',
      name: 'Отчёт общий',
      component: AppReportsMainReport
    },
    {
      path: '/admin/reports/VehicleDriverReport',
      name: 'Отчет по выручке в разрезе по водителям',
      component: AppКeportsVehicleDriverReport
    },
    {
      path: '/admin/reports/VehicleReport',
      name: 'Отчет по автомобилям',
      component: AppReportsVehicleReport
    },
    {
      path: '/admin/reports/DriverReport',
      name: 'Отчет по водителям',
      component: AppReportsDriverReport
    },
    {
      path: '/admin/reports/StockReport',
      name: 'Отчёт по складу',
      component: AppReportsStockReport
    },
    {
      path: '/admin/reports/accountReport',
      name: 'По кассовым счетам',
      component: AppReportsAccountReport
    },
    {
      path: '/admin/gps_map',
      name: 'Карта',
      component: AppGpsMap
    },
    {
      path: '/admin/UserCompanyBill/all',
      name: 'Платежи',
      component: AppUserCompanyBillAll
    },
    {
      path: '/admin/UserCompany/',
      name: 'Настройки',
      component: AppUserCompany
    },
    {
      path: '/admin/content/support',
      name: 'Поддержка',
      component: AppСontentSupport
    },
    {
      path: '/admin/Vehicle/:id',
      name: 'Конкретный авто',
      component: AppVehicleId
    },
    {
      path: '/admin/UserDriverProfile/create',
      name: 'Добавляем водителя',
      component: AppUserDriverProfileСreate
    },
    {
      path: '/admin/auto/create',
      name: 'Добавляем авто',
      component: AppVehicleСreate
    },
    {
      path: '/admin/VehicleMaintenance/create',
      name: 'Добавление записи т.о.',
      component: AppVehicleMaintenanceCreate
    },
    {
      path: '/admin/VehicleMaintenance/:id',
      name: 'Редактирование записи т.о.',
      component: AppVehicleMaintenanceId
    },
    {
      path: '/admin/VehicleOwner/create',
      name: 'Добавление владельца',
      component: AppVehicleOwnerCreate
    },
    {
      path: '/admin/VehicleOwner/:id',
      name: 'Конкретный владелец',
      component: AppVehicleOwnerId
    },
    {
      path: '/admin/UserDriverProfile/:id',
      name: 'Клиент (водитель конкрктный)',
      component: AppUserDriverProfileId
    },
    {
      path: '/admin/BillItem/RentBillItemForm/create',
      name: 'Добавление статьи',
      component: AppBillItemRentBillItemFormCreate
    },
    {
      path: '/admin/BillItem/RentBillItemForm/:id',
      name: 'редактирование статьи',
      component: AppBillItemRentBillItemFormId
    },
  ]
})