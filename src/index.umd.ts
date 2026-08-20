/**
 * 全量 UMD 打包入口 - 供 HTML 页面通过 CDN 引入 Vue + Element Plus 后使用
 * 由 generate-icons.ts 自动生成，请勿手动修改
 *
 * 业务组件和指令的注册逻辑在 ./install-components（静态维护），
 * 此文件仅负责动态生成图标组件的导入和注册。
 *
 * UMD 全局变量 HdiUi 结构: { install, HdiIcon, HdiDictionary, HdiForm, HdiTable, Icon80Add, ... }
 * app.use(HdiUi) 会调用 install 注册全部组件和指令
 */
import type { App } from 'vue'
import { toKebabName } from './utils/kebab'
import { installBusinessComponents, type HdiUiInstallOptions } from './install-components'
import Icon60Add from './icons/components/Icon60Add.vue'
import Icon60AreaChart from './icons/components/Icon60AreaChart.vue'
import Icon60Area from './icons/components/Icon60Area.vue'
import Icon60Article from './icons/components/Icon60Article.vue'
import Icon60Back2 from './icons/components/Icon60Back2.vue'
import Icon60Back from './icons/components/Icon60Back.vue'
import Icon60Bell from './icons/components/Icon60Bell.vue'
import Icon60Clear from './icons/components/Icon60Clear.vue'
import Icon60Corsshair2 from './icons/components/Icon60Corsshair2.vue'
import Icon60Corsshair from './icons/components/Icon60Corsshair.vue'
import Icon60Delete from './icons/components/Icon60Delete.vue'
import Icon60Download2 from './icons/components/Icon60Download2.vue'
import Icon60Download from './icons/components/Icon60Download.vue'
import Icon60DrawShape from './icons/components/Icon60DrawShape.vue'
import Icon60Edit2 from './icons/components/Icon60Edit2.vue'
import Icon60Edit from './icons/components/Icon60Edit.vue'
import Icon60Exit2 from './icons/components/Icon60Exit2.vue'
import Icon60Exit from './icons/components/Icon60Exit.vue'
import Icon60Export from './icons/components/Icon60Export.vue'
import Icon60Failed from './icons/components/Icon60Failed.vue'
import Icon60FileMarked from './icons/components/Icon60FileMarked.vue'
import Icon60FolderAdd from './icons/components/Icon60FolderAdd.vue'
import Icon60Fullscreen2 from './icons/components/Icon60Fullscreen2.vue'
import Icon60Fullscreen from './icons/components/Icon60Fullscreen.vue'
import Icon60Function from './icons/components/Icon60Function.vue'
import Icon60Hand from './icons/components/Icon60Hand.vue'
import Icon60Import2 from './icons/components/Icon60Import2.vue'
import Icon60Import from './icons/components/Icon60Import.vue'
import Icon60Layers from './icons/components/Icon60Layers.vue'
import Icon60Left from './icons/components/Icon60Left.vue'
import Icon60Linechart from './icons/components/Icon60Linechart.vue'
import Icon60Location from './icons/components/Icon60Location.vue'
import Icon60Lock from './icons/components/Icon60Lock.vue'
import Icon60Minimize2 from './icons/components/Icon60Minimize2.vue'
import Icon60Minimize from './icons/components/Icon60Minimize.vue'
import Icon60PieChart from './icons/components/Icon60PieChart.vue'
import Icon60Right from './icons/components/Icon60Right.vue'
import Icon60RulerMeasure from './icons/components/Icon60RulerMeasure.vue'
import Icon60Safety2 from './icons/components/Icon60Safety2.vue'
import Icon60Safety from './icons/components/Icon60Safety.vue'
import Icon60ScreenChange from './icons/components/Icon60ScreenChange.vue'
import Icon60Search from './icons/components/Icon60Search.vue'
import Icon60Settings2 from './icons/components/Icon60Settings2.vue'
import Icon60Settings from './icons/components/Icon60Settings.vue'
import Icon60StatsAlt from './icons/components/Icon60StatsAlt.vue'
import Icon60Success from './icons/components/Icon60Success.vue'
import Icon60Tips2 from './icons/components/Icon60Tips2.vue'
import Icon60Tips3 from './icons/components/Icon60Tips3.vue'
import Icon60Tips from './icons/components/Icon60Tips.vue'
import Icon60Upload from './icons/components/Icon60Upload.vue'
import Icon60User from './icons/components/Icon60User.vue'
import Icon60Volume from './icons/components/Icon60Volume.vue'
import Icon60Warning from './icons/components/Icon60Warning.vue'
import Icon60ZoomIn from './icons/components/Icon60ZoomIn.vue'
import Icon60ZoomOut from './icons/components/Icon60ZoomOut.vue'
import Icon80Add from './icons/components/Icon80Add.vue'
import Icon80AreaChart from './icons/components/Icon80AreaChart.vue'
import Icon80Area from './icons/components/Icon80Area.vue'
import Icon80Article from './icons/components/Icon80Article.vue'
import Icon80Back from './icons/components/Icon80Back.vue'
import Icon80Bell from './icons/components/Icon80Bell.vue'
import Icon80Clear from './icons/components/Icon80Clear.vue'
import Icon80Corsshair from './icons/components/Icon80Corsshair.vue'
import Icon80Delete from './icons/components/Icon80Delete.vue'
import Icon80Down from './icons/components/Icon80Down.vue'
import Icon80Download2 from './icons/components/Icon80Download2.vue'
import Icon80DrawShape from './icons/components/Icon80DrawShape.vue'
import Icon80Edit from './icons/components/Icon80Edit.vue'
import Icon80Exit2 from './icons/components/Icon80Exit2.vue'
import Icon80Exit from './icons/components/Icon80Exit.vue'
import Icon80Export from './icons/components/Icon80Export.vue'
import Icon80Failed from './icons/components/Icon80Failed.vue'
import Icon80FileMarked from './icons/components/Icon80FileMarked.vue'
import Icon80FolderAdd from './icons/components/Icon80FolderAdd.vue'
import Icon80Fullscreen2 from './icons/components/Icon80Fullscreen2.vue'
import Icon80Fullscreen from './icons/components/Icon80Fullscreen.vue'
import Icon80Function from './icons/components/Icon80Function.vue'
import Icon80Hand from './icons/components/Icon80Hand.vue'
import Icon80Height from './icons/components/Icon80Height.vue'
import Icon80Import2 from './icons/components/Icon80Import2.vue'
import Icon80Import from './icons/components/Icon80Import.vue'
import Icon80Layers from './icons/components/Icon80Layers.vue'
import Icon80Left from './icons/components/Icon80Left.vue'
import Icon80Linechart from './icons/components/Icon80Linechart.vue'
import Icon80Location from './icons/components/Icon80Location.vue'
import Icon80Lock from './icons/components/Icon80Lock.vue'
import Icon80Minimize2 from './icons/components/Icon80Minimize2.vue'
import Icon80Minimize from './icons/components/Icon80Minimize.vue'
import Icon80PieChart from './icons/components/Icon80PieChart.vue'
import Icon80Refresh from './icons/components/Icon80Refresh.vue'
import Icon80Right from './icons/components/Icon80Right.vue'
import Icon80RulerMeasure from './icons/components/Icon80RulerMeasure.vue'
import Icon80Safety2 from './icons/components/Icon80Safety2.vue'
import Icon80Safety from './icons/components/Icon80Safety.vue'
import Icon80Search from './icons/components/Icon80Search.vue'
import Icon80Settings2 from './icons/components/Icon80Settings2.vue'
import Icon80Settings from './icons/components/Icon80Settings.vue'
import Icon80StatsAlt from './icons/components/Icon80StatsAlt.vue'
import Icon80Success from './icons/components/Icon80Success.vue'
import Icon80Tips2 from './icons/components/Icon80Tips2.vue'
import Icon80Tips3 from './icons/components/Icon80Tips3.vue'
import Icon80Tips from './icons/components/Icon80Tips.vue'
import Icon80Up from './icons/components/Icon80Up.vue'
import Icon80Upload from './icons/components/Icon80Upload.vue'
import Icon80User from './icons/components/Icon80User.vue'
import Icon80Volume from './icons/components/Icon80Volume.vue'
import Icon80ZoomIn from './icons/components/Icon80ZoomIn.vue'
import Icon80ZoomOut from './icons/components/Icon80ZoomOut.vue'
import Icon90Add2 from './icons/components/Icon90Add2.vue'
import Icon90Add from './icons/components/Icon90Add.vue'
import Icon90Alarmclock2 from './icons/components/Icon90Alarmclock2.vue'
import Icon90Alarmclock3 from './icons/components/Icon90Alarmclock3.vue'
import Icon90Alarmclock from './icons/components/Icon90Alarmclock.vue'
import Icon90Alerts from './icons/components/Icon90Alerts.vue'
import Icon90Animal from './icons/components/Icon90Animal.vue'
import Icon90ArrowsCross from './icons/components/Icon90ArrowsCross.vue'
import Icon90Article2 from './icons/components/Icon90Article2.vue'
import Icon90Article from './icons/components/Icon90Article.vue'
import Icon90Attach from './icons/components/Icon90Attach.vue'
import Icon90Badge from './icons/components/Icon90Badge.vue'
import Icon90Bell2 from './icons/components/Icon90Bell2.vue'
import Icon90Bell from './icons/components/Icon90Bell.vue'
import Icon90Bigdown from './icons/components/Icon90Bigdown.vue'
import Icon90Bigup from './icons/components/Icon90Bigup.vue'
import Icon90Bike from './icons/components/Icon90Bike.vue'
import Icon90Bill from './icons/components/Icon90Bill.vue'
import Icon90Bluetooth from './icons/components/Icon90Bluetooth.vue'
import Icon90Board from './icons/components/Icon90Board.vue'
import Icon90BookMark from './icons/components/Icon90BookMark.vue'
import Icon90Book from './icons/components/Icon90Book.vue'
import Icon90Bottle from './icons/components/Icon90Bottle.vue'
import Icon90Box2 from './icons/components/Icon90Box2.vue'
import Icon90Box3 from './icons/components/Icon90Box3.vue'
import Icon90Box from './icons/components/Icon90Box.vue'
import Icon90Briefcase from './icons/components/Icon90Briefcase.vue'
import Icon90Browser from './icons/components/Icon90Browser.vue'
import Icon90Building2 from './icons/components/Icon90Building2.vue'
import Icon90Building3 from './icons/components/Icon90Building3.vue'
import Icon90Building4 from './icons/components/Icon90Building4.vue'
import Icon90Building5 from './icons/components/Icon90Building5.vue'
import Icon90Building6 from './icons/components/Icon90Building6.vue'
import Icon90Building7 from './icons/components/Icon90Building7.vue'
import Icon90Building from './icons/components/Icon90Building.vue'
import Icon90Bus from './icons/components/Icon90Bus.vue'
import Icon90Calculator2 from './icons/components/Icon90Calculator2.vue'
import Icon90Calculator3 from './icons/components/Icon90Calculator3.vue'
import Icon90Calculator4 from './icons/components/Icon90Calculator4.vue'
import Icon90Calculator from './icons/components/Icon90Calculator.vue'
import Icon90Calendar from './icons/components/Icon90Calendar.vue'
import Icon90Camera2 from './icons/components/Icon90Camera2.vue'
import Icon90Camera from './icons/components/Icon90Camera.vue'
import Icon90Car2 from './icons/components/Icon90Car2.vue'
import Icon90Car from './icons/components/Icon90Car.vue'
import Icon90CardLayout from './icons/components/Icon90CardLayout.vue'
import Icon90Card from './icons/components/Icon90Card.vue'
import Icon90Cd from './icons/components/Icon90Cd.vue'
import Icon90Change2 from './icons/components/Icon90Change2.vue'
import Icon90Change3 from './icons/components/Icon90Change3.vue'
import Icon90ChangeLanguages from './icons/components/Icon90ChangeLanguages.vue'
import Icon90Change from './icons/components/Icon90Change.vue'
import Icon90Charity from './icons/components/Icon90Charity.vue'
import Icon90Chat from './icons/components/Icon90Chat.vue'
import Icon90Check from './icons/components/Icon90Check.vue'
import Icon90Checked2 from './icons/components/Icon90Checked2.vue'
import Icon90Checked from './icons/components/Icon90Checked.vue'
import Icon90Checkin from './icons/components/Icon90Checkin.vue'
import Icon90Child from './icons/components/Icon90Child.vue'
import Icon90Chip from './icons/components/Icon90Chip.vue'
import Icon90City2 from './icons/components/Icon90City2.vue'
import Icon90City from './icons/components/Icon90City.vue'
import Icon90Classify2 from './icons/components/Icon90Classify2.vue'
import Icon90Classify3 from './icons/components/Icon90Classify3.vue'
import Icon90Classify4 from './icons/components/Icon90Classify4.vue'
import Icon90Classify from './icons/components/Icon90Classify.vue'
import Icon90Clear from './icons/components/Icon90Clear.vue'
import Icon90Close from './icons/components/Icon90Close.vue'
import Icon90Cloud from './icons/components/Icon90Cloud.vue'
import Icon90Code2 from './icons/components/Icon90Code2.vue'
import Icon90Code3 from './icons/components/Icon90Code3.vue'
import Icon90Code4 from './icons/components/Icon90Code4.vue'
import Icon90Code from './icons/components/Icon90Code.vue'
import Icon90Coins from './icons/components/Icon90Coins.vue'
import Icon90Comment from './icons/components/Icon90Comment.vue'
import Icon90Connection from './icons/components/Icon90Connection.vue'
import Icon90Consume from './icons/components/Icon90Consume.vue'
import Icon90Correct2 from './icons/components/Icon90Correct2.vue'
import Icon90Correct from './icons/components/Icon90Correct.vue'
import Icon90Corsshair from './icons/components/Icon90Corsshair.vue'
import Icon90Cover from './icons/components/Icon90Cover.vue'
import Icon90Crop from './icons/components/Icon90Crop.vue'
import Icon90Cupboard from './icons/components/Icon90Cupboard.vue'
import Icon90Dashboard from './icons/components/Icon90Dashboard.vue'
import Icon90Database from './icons/components/Icon90Database.vue'
import Icon90Date2 from './icons/components/Icon90Date2.vue'
import Icon90Date3 from './icons/components/Icon90Date3.vue'
import Icon90Date from './icons/components/Icon90Date.vue'
import Icon90Delete2 from './icons/components/Icon90Delete2.vue'
import Icon90Delete from './icons/components/Icon90Delete.vue'
import Icon90Device from './icons/components/Icon90Device.vue'
import Icon90Diamond from './icons/components/Icon90Diamond.vue'
import Icon90Dining2 from './icons/components/Icon90Dining2.vue'
import Icon90Dining from './icons/components/Icon90Dining.vue'
import Icon90Discover from './icons/components/Icon90Discover.vue'
import Icon90Down2 from './icons/components/Icon90Down2.vue'
import Icon90Down3 from './icons/components/Icon90Down3.vue'
import Icon90Down4 from './icons/components/Icon90Down4.vue'
import Icon90Down5 from './icons/components/Icon90Down5.vue'
import Icon90Down from './icons/components/Icon90Down.vue'
import Icon90Download2 from './icons/components/Icon90Download2.vue'
import Icon90Download3 from './icons/components/Icon90Download3.vue'
import Icon90Download from './icons/components/Icon90Download.vue'
import Icon90DrawShape from './icons/components/Icon90DrawShape.vue'
import Icon90Drug from './icons/components/Icon90Drug.vue'
import Icon90Earth from './icons/components/Icon90Earth.vue'
import Icon90Edit2 from './icons/components/Icon90Edit2.vue'
import Icon90Edit3 from './icons/components/Icon90Edit3.vue'
import Icon90Edit4 from './icons/components/Icon90Edit4.vue'
import Icon90Edit from './icons/components/Icon90Edit.vue'
import Icon90Elevator from './icons/components/Icon90Elevator.vue'
import Icon90Examine2 from './icons/components/Icon90Examine2.vue'
import Icon90Examine3 from './icons/components/Icon90Examine3.vue'
import Icon90Examine from './icons/components/Icon90Examine.vue'
import Icon90Exit2 from './icons/components/Icon90Exit2.vue'
import Icon90Exit from './icons/components/Icon90Exit.vue'
import Icon90Expand from './icons/components/Icon90Expand.vue'
import Icon90Expenses from './icons/components/Icon90Expenses.vue'
import Icon90Export from './icons/components/Icon90Export.vue'
import Icon90Factory from './icons/components/Icon90Factory.vue'
import Icon90Failed from './icons/components/Icon90Failed.vue'
import Icon90Female from './icons/components/Icon90Female.vue'
import Icon90File2 from './icons/components/Icon90File2.vue'
import Icon90File3 from './icons/components/Icon90File3.vue'
import Icon90File4 from './icons/components/Icon90File4.vue'
import Icon90File5 from './icons/components/Icon90File5.vue'
import Icon90FileAdd from './icons/components/Icon90FileAdd.vue'
import Icon90FileReduce from './icons/components/Icon90FileReduce.vue'
import Icon90File from './icons/components/Icon90File.vue'
import Icon90Finish2 from './icons/components/Icon90Finish2.vue'
import Icon90Finish from './icons/components/Icon90Finish.vue'
import Icon90Fire from './icons/components/Icon90Fire.vue'
import Icon90Flag2 from './icons/components/Icon90Flag2.vue'
import Icon90Flag3 from './icons/components/Icon90Flag3.vue'
import Icon90Flag from './icons/components/Icon90Flag.vue'
import Icon90Flashlight from './icons/components/Icon90Flashlight.vue'
import Icon90FolderAdd from './icons/components/Icon90FolderAdd.vue'
import Icon90FolderReduce from './icons/components/Icon90FolderReduce.vue'
import Icon90Folder from './icons/components/Icon90Folder.vue'
import Icon90Folderopen from './icons/components/Icon90Folderopen.vue'
import Icon90Forbid from './icons/components/Icon90Forbid.vue'
import Icon90Fullscreen from './icons/components/Icon90Fullscreen.vue'
import Icon90Function from './icons/components/Icon90Function.vue'
import Icon90Funnel from './icons/components/Icon90Funnel.vue'
import Icon90Game from './icons/components/Icon90Game.vue'
import Icon90GestureUp from './icons/components/Icon90GestureUp.vue'
import Icon90Gift from './icons/components/Icon90Gift.vue'
import Icon90Handwashing from './icons/components/Icon90Handwashing.vue'
import Icon90Healthy from './icons/components/Icon90Healthy.vue'
import Icon90Help from './icons/components/Icon90Help.vue'
import Icon90Home2 from './icons/components/Icon90Home2.vue'
import Icon90Home3 from './icons/components/Icon90Home3.vue'
import Icon90Home4 from './icons/components/Icon90Home4.vue'
import Icon90Home5 from './icons/components/Icon90Home5.vue'
import Icon90Home from './icons/components/Icon90Home.vue'
import Icon90Hospital from './icons/components/Icon90Hospital.vue'
import Icon90Hotel from './icons/components/Icon90Hotel.vue'
import Icon90Hourglass2 from './icons/components/Icon90Hourglass2.vue'
import Icon90Hourglass3 from './icons/components/Icon90Hourglass3.vue'
import Icon90Hourglass from './icons/components/Icon90Hourglass.vue'
import Icon90IdCard from './icons/components/Icon90IdCard.vue'
import Icon90Import from './icons/components/Icon90Import.vue'
import Icon90Income from './icons/components/Icon90Income.vue'
import Icon90Inquire from './icons/components/Icon90Inquire.vue'
import Icon90Invisible from './icons/components/Icon90Invisible.vue'
import Icon90Invoice from './icons/components/Icon90Invoice.vue'
import Icon90Key from './icons/components/Icon90Key.vue'
import Icon90Law from './icons/components/Icon90Law.vue'
import Icon90Leaf2 from './icons/components/Icon90Leaf2.vue'
import Icon90Leaf from './icons/components/Icon90Leaf.vue'
import Icon90Left2 from './icons/components/Icon90Left2.vue'
import Icon90Left3 from './icons/components/Icon90Left3.vue'
import Icon90Left4 from './icons/components/Icon90Left4.vue'
import Icon90Left5 from './icons/components/Icon90Left5.vue'
import Icon90Left from './icons/components/Icon90Left.vue'
import Icon90Lightbulb2 from './icons/components/Icon90Lightbulb2.vue'
import Icon90Lightbulb from './icons/components/Icon90Lightbulb.vue'
import Icon90Lightning2 from './icons/components/Icon90Lightning2.vue'
import Icon90Lightning3 from './icons/components/Icon90Lightning3.vue'
import Icon90Lightning from './icons/components/Icon90Lightning.vue'
import Icon90Linechart from './icons/components/Icon90Linechart.vue'
import Icon90List from './icons/components/Icon90List.vue'
import Icon90Live2 from './icons/components/Icon90Live2.vue'
import Icon90Live from './icons/components/Icon90Live.vue'
import Icon90Location2 from './icons/components/Icon90Location2.vue'
import Icon90Location from './icons/components/Icon90Location.vue'
import Icon90Lock2 from './icons/components/Icon90Lock2.vue'
import Icon90Lock from './icons/components/Icon90Lock.vue'
import Icon90Lose from './icons/components/Icon90Lose.vue'
import Icon90Mail2 from './icons/components/Icon90Mail2.vue'
import Icon90Mail from './icons/components/Icon90Mail.vue'
import Icon90Male from './icons/components/Icon90Male.vue'
import Icon90Mark from './icons/components/Icon90Mark.vue'
import Icon90Medical from './icons/components/Icon90Medical.vue'
import Icon90Mic2 from './icons/components/Icon90Mic2.vue'
import Icon90Mic from './icons/components/Icon90Mic.vue'
import Icon90Micmute from './icons/components/Icon90Micmute.vue'
import Icon90Mine4 from './icons/components/Icon90Mine4.vue'
import Icon90Mine5 from './icons/components/Icon90Mine5.vue'
import Icon90Minimize from './icons/components/Icon90Minimize.vue'
import Icon90Minus from './icons/components/Icon90Minus.vue'
import Icon90Mobilephone from './icons/components/Icon90Mobilephone.vue'
import Icon90Module from './icons/components/Icon90Module.vue'
import Icon90Molecule from './icons/components/Icon90Molecule.vue'
import Icon90Money from './icons/components/Icon90Money.vue'
import Icon90Moneybag from './icons/components/Icon90Moneybag.vue'
import Icon90Monitor from './icons/components/Icon90Monitor.vue'
import Icon90Monument2 from './icons/components/Icon90Monument2.vue'
import Icon90Monument from './icons/components/Icon90Monument.vue'
import Icon90More1 from './icons/components/Icon90More1.vue'
import Icon90More2 from './icons/components/Icon90More2.vue'
import Icon90More3 from './icons/components/Icon90More3.vue'
import Icon90More from './icons/components/Icon90More.vue'
import Icon90Museum from './icons/components/Icon90Museum.vue'
import Icon90Mute from './icons/components/Icon90Mute.vue'
import Icon90NoNotice from './icons/components/Icon90NoNotice.vue'
import Icon90Note2 from './icons/components/Icon90Note2.vue'
import Icon90Note from './icons/components/Icon90Note.vue'
import Icon90Notice from './icons/components/Icon90Notice.vue'
import Icon90Order from './icons/components/Icon90Order.vue'
import Icon90Paper from './icons/components/Icon90Paper.vue'
import Icon90Paperplane2 from './icons/components/Icon90Paperplane2.vue'
import Icon90Paperplane from './icons/components/Icon90Paperplane.vue'
import Icon90PetrolPump from './icons/components/Icon90PetrolPump.vue'
import Icon90Pharmacy2 from './icons/components/Icon90Pharmacy2.vue'
import Icon90Pharmacy3 from './icons/components/Icon90Pharmacy3.vue'
import Icon90Pharmacy from './icons/components/Icon90Pharmacy.vue'
import Icon90Phone2 from './icons/components/Icon90Phone2.vue'
import Icon90Phone from './icons/components/Icon90Phone.vue'
import Icon90Picture from './icons/components/Icon90Picture.vue'
import Icon90PieChart from './icons/components/Icon90PieChart.vue'
import Icon90Plane2 from './icons/components/Icon90Plane2.vue'
import Icon90Plane from './icons/components/Icon90Plane.vue'
import Icon90Play from './icons/components/Icon90Play.vue'
import Icon90PointLine from './icons/components/Icon90PointLine.vue'
import Icon90Print from './icons/components/Icon90Print.vue'
import Icon90Quantity from './icons/components/Icon90Quantity.vue'
import Icon90Question from './icons/components/Icon90Question.vue'
import Icon90Radio from './icons/components/Icon90Radio.vue'
import Icon90Reboot from './icons/components/Icon90Reboot.vue'
import Icon90Recharge from './icons/components/Icon90Recharge.vue'
import Icon90Record2 from './icons/components/Icon90Record2.vue'
import Icon90Record from './icons/components/Icon90Record.vue'
import Icon90Reduce from './icons/components/Icon90Reduce.vue'
import Icon90Refresh2 from './icons/components/Icon90Refresh2.vue'
import Icon90Refresh from './icons/components/Icon90Refresh.vue'
import Icon90Repair from './icons/components/Icon90Repair.vue'
import Icon90Repost2 from './icons/components/Icon90Repost2.vue'
import Icon90Repost from './icons/components/Icon90Repost.vue'
import Icon90Right2 from './icons/components/Icon90Right2.vue'
import Icon90Right3 from './icons/components/Icon90Right3.vue'
import Icon90Right4 from './icons/components/Icon90Right4.vue'
import Icon90Right5 from './icons/components/Icon90Right5.vue'
import Icon90Right from './icons/components/Icon90Right.vue'
import Icon90Road from './icons/components/Icon90Road.vue'
import Icon90RulerMeasure from './icons/components/Icon90RulerMeasure.vue'
import Icon90Safety2 from './icons/components/Icon90Safety2.vue'
import Icon90Safety3 from './icons/components/Icon90Safety3.vue'
import Icon90Safety4 from './icons/components/Icon90Safety4.vue'
import Icon90Safety from './icons/components/Icon90Safety.vue'
import Icon90Save2 from './icons/components/Icon90Save2.vue'
import Icon90Save3 from './icons/components/Icon90Save3.vue'
import Icon90Save from './icons/components/Icon90Save.vue'
import Icon90ScanPay from './icons/components/Icon90ScanPay.vue'
import Icon90School from './icons/components/Icon90School.vue'
import Icon90Scissors from './icons/components/Icon90Scissors.vue'
import Icon90Search from './icons/components/Icon90Search.vue'
import Icon90Service2 from './icons/components/Icon90Service2.vue'
import Icon90Service3 from './icons/components/Icon90Service3.vue'
import Icon90Service4 from './icons/components/Icon90Service4.vue'
import Icon90Service from './icons/components/Icon90Service.vue'
import Icon90Setting from './icons/components/Icon90Setting.vue'
import Icon90Settings from './icons/components/Icon90Settings.vue'
import Icon90Share from './icons/components/Icon90Share.vue'
import Icon90Signal from './icons/components/Icon90Signal.vue'
import Icon90Sitemap from './icons/components/Icon90Sitemap.vue'
import Icon90Sound from './icons/components/Icon90Sound.vue'
import Icon90Stack from './icons/components/Icon90Stack.vue'
import Icon90Star from './icons/components/Icon90Star.vue'
import Icon90Staroff from './icons/components/Icon90Staroff.vue'
import Icon90StatsAlt2 from './icons/components/Icon90StatsAlt2.vue'
import Icon90StatsAlt from './icons/components/Icon90StatsAlt.vue'
import Icon90Stethoscope from './icons/components/Icon90Stethoscope.vue'
import Icon90Student from './icons/components/Icon90Student.vue'
import Icon90Subscribe from './icons/components/Icon90Subscribe.vue'
import Icon90Table from './icons/components/Icon90Table.vue'
import Icon90Tag from './icons/components/Icon90Tag.vue'
import Icon90Tapy from './icons/components/Icon90Tapy.vue'
import Icon90Target from './icons/components/Icon90Target.vue'
import Icon90Team2 from './icons/components/Icon90Team2.vue'
import Icon90Team3 from './icons/components/Icon90Team3.vue'
import Icon90Team4 from './icons/components/Icon90Team4.vue'
import Icon90Team from './icons/components/Icon90Team.vue'
import Icon90Temperature from './icons/components/Icon90Temperature.vue'
import Icon90ThumbsUp2 from './icons/components/Icon90ThumbsUp2.vue'
import Icon90ThumbsUp from './icons/components/Icon90ThumbsUp.vue'
import Icon90Ticket2 from './icons/components/Icon90Ticket2.vue'
import Icon90Ticket from './icons/components/Icon90Ticket.vue'
import Icon90Time2 from './icons/components/Icon90Time2.vue'
import Icon90Time from './icons/components/Icon90Time.vue'
import Icon90Tip2 from './icons/components/Icon90Tip2.vue'
import Icon90Tip from './icons/components/Icon90Tip.vue'
import Icon90Top from './icons/components/Icon90Top.vue'
import Icon90Topic from './icons/components/Icon90Topic.vue'
import Icon90Trending from './icons/components/Icon90Trending.vue'
import Icon90Trophy2 from './icons/components/Icon90Trophy2.vue'
import Icon90Trophy3 from './icons/components/Icon90Trophy3.vue'
import Icon90Trophy4 from './icons/components/Icon90Trophy4.vue'
import Icon90Trophy from './icons/components/Icon90Trophy.vue'
import Icon90Unlike from './icons/components/Icon90Unlike.vue'
import Icon90Up2 from './icons/components/Icon90Up2.vue'
import Icon90Up3 from './icons/components/Icon90Up3.vue'
import Icon90Up4 from './icons/components/Icon90Up4.vue'
import Icon90Up5 from './icons/components/Icon90Up5.vue'
import Icon90Up from './icons/components/Icon90Up.vue'
import Icon90Upload2 from './icons/components/Icon90Upload2.vue'
import Icon90Upload from './icons/components/Icon90Upload.vue'
import Icon90Usb from './icons/components/Icon90Usb.vue'
import Icon90User2 from './icons/components/Icon90User2.vue'
import Icon90User3 from './icons/components/Icon90User3.vue'
import Icon90User4 from './icons/components/Icon90User4.vue'
import Icon90User5 from './icons/components/Icon90User5.vue'
import Icon90User6 from './icons/components/Icon90User6.vue'
import Icon90User7 from './icons/components/Icon90User7.vue'
import Icon90User8 from './icons/components/Icon90User8.vue'
import Icon90UserAdd from './icons/components/Icon90UserAdd.vue'
import Icon90User from './icons/components/Icon90User.vue'
import Icon90Video from './icons/components/Icon90Video.vue'
import Icon90View2 from './icons/components/Icon90View2.vue'
import Icon90View from './icons/components/Icon90View.vue'
import Icon90Viewoff from './icons/components/Icon90Viewoff.vue'
import Icon90Vip2 from './icons/components/Icon90Vip2.vue'
import Icon90Vip from './icons/components/Icon90Vip.vue'
import Icon90Warn2 from './icons/components/Icon90Warn2.vue'
import Icon90Warn from './icons/components/Icon90Warn.vue'
import Icon90WaterTicket from './icons/components/Icon90WaterTicket.vue'
import Icon90Water from './icons/components/Icon90Water.vue'
import Icon90Webcam2 from './icons/components/Icon90Webcam2.vue'
import Icon90Webcam from './icons/components/Icon90Webcam.vue'
import Icon90Wechat from './icons/components/Icon90Wechat.vue'
import Icon90Wifi from './icons/components/Icon90Wifi.vue'
import Icon90WxMiniProgram from './icons/components/Icon90WxMiniProgram.vue'
import Icon90Zoomin from './icons/components/Icon90Zoomin.vue'
import Icon90Zoomout from './icons/components/Icon90Zoomout.vue'
import IconCustom1stCert from './icons/components/IconCustom1stCert.vue'
import IconCustom2ndCert from './icons/components/IconCustom2ndCert.vue'
import IconCustomAggregation2 from './icons/components/IconCustomAggregation2.vue'
import IconCustomAggregation from './icons/components/IconCustomAggregation.vue'
import IconCustomAmmonite2 from './icons/components/IconCustomAmmonite2.vue'
import IconCustomAmmonite from './icons/components/IconCustomAmmonite.vue'
import IconCustomAnimal from './icons/components/IconCustomAnimal.vue'
import IconCustomAnnouncement from './icons/components/IconCustomAnnouncement.vue'
import IconCustomArticle2 from './icons/components/IconCustomArticle2.vue'
import IconCustomArticle from './icons/components/IconCustomArticle.vue'
import IconCustomBack2 from './icons/components/IconCustomBack2.vue'
import IconCustomBack3 from './icons/components/IconCustomBack3.vue'
import IconCustomBack4 from './icons/components/IconCustomBack4.vue'
import IconCustomBack from './icons/components/IconCustomBack.vue'
import IconCustomBadge from './icons/components/IconCustomBadge.vue'
import IconCustomBell from './icons/components/IconCustomBell.vue'
import IconCustomBox from './icons/components/IconCustomBox.vue'
import IconCustomBriefcase from './icons/components/IconCustomBriefcase.vue'
import IconCustomBuilding2 from './icons/components/IconCustomBuilding2.vue'
import IconCustomBuilding from './icons/components/IconCustomBuilding.vue'
import IconCustomCalendar from './icons/components/IconCustomCalendar.vue'
import IconCustomCart2stars from './icons/components/IconCustomCart2stars.vue'
import IconCustomCart3stars from './icons/components/IconCustomCart3stars.vue'
import IconCustomCert from './icons/components/IconCustomCert.vue'
import IconCustomChange2 from './icons/components/IconCustomChange2.vue'
import IconCustomChange from './icons/components/IconCustomChange.vue'
import IconCustomChat from './icons/components/IconCustomChat.vue'
import IconCustomContrast from './icons/components/IconCustomContrast.vue'
import IconCustomData from './icons/components/IconCustomData.vue'
import IconCustomDelete2 from './icons/components/IconCustomDelete2.vue'
import IconCustomDelete from './icons/components/IconCustomDelete.vue'
import IconCustomDetails from './icons/components/IconCustomDetails.vue'
import IconCustomDownArrow from './icons/components/IconCustomDownArrow.vue'
import IconCustomDrawers2 from './icons/components/IconCustomDrawers2.vue'
import IconCustomDrawers from './icons/components/IconCustomDrawers.vue'
import IconCustomEdit from './icons/components/IconCustomEdit.vue'
import IconCustomExamine from './icons/components/IconCustomExamine.vue'
import IconCustomFailed from './icons/components/IconCustomFailed.vue'
import IconCustomFileFailed from './icons/components/IconCustomFileFailed.vue'
import IconCustomFileForward from './icons/components/IconCustomFileForward.vue'
import IconCustomFileFound from './icons/components/IconCustomFileFound.vue'
import IconCustomFileSuccess2 from './icons/components/IconCustomFileSuccess2.vue'
import IconCustomFileSuccess from './icons/components/IconCustomFileSuccess.vue'
import IconCustomFileUpload2 from './icons/components/IconCustomFileUpload2.vue'
import IconCustomFileUpload from './icons/components/IconCustomFileUpload.vue'
import IconCustomFileWaiting from './icons/components/IconCustomFileWaiting.vue'
import IconCustomFile from './icons/components/IconCustomFile.vue'
import IconCustomFiles from './icons/components/IconCustomFiles.vue'
import IconCustomFillExamine from './icons/components/IconCustomFillExamine.vue'
import IconCustomFolderOpen from './icons/components/IconCustomFolderOpen.vue'
import IconCustomFolder from './icons/components/IconCustomFolder.vue'
import IconCustomGuide from './icons/components/IconCustomGuide.vue'
import IconCustomHome from './icons/components/IconCustomHome.vue'
import IconCustomLand from './icons/components/IconCustomLand.vue'
import IconCustomLayers2 from './icons/components/IconCustomLayers2.vue'
import IconCustomLayers from './icons/components/IconCustomLayers.vue'
import IconCustomLeaf2 from './icons/components/IconCustomLeaf2.vue'
import IconCustomLeaf from './icons/components/IconCustomLeaf.vue'
import IconCustomLedger from './icons/components/IconCustomLedger.vue'
import IconCustomLifted from './icons/components/IconCustomLifted.vue'
import IconCustomLockOpen from './icons/components/IconCustomLockOpen.vue'
import IconCustomLock from './icons/components/IconCustomLock.vue'
import IconCustomMark from './icons/components/IconCustomMark.vue'
import IconCustomMolecule from './icons/components/IconCustomMolecule.vue'
import IconCustomMoney from './icons/components/IconCustomMoney.vue'
import IconCustomMonitor2 from './icons/components/IconCustomMonitor2.vue'
import IconCustomMonitor from './icons/components/IconCustomMonitor.vue'
import IconCustomMonumentManage from './icons/components/IconCustomMonumentManage.vue'
import IconCustomMountain2 from './icons/components/IconCustomMountain2.vue'
import IconCustomMountain3 from './icons/components/IconCustomMountain3.vue'
import IconCustomMountain from './icons/components/IconCustomMountain.vue'
import IconCustomNoPinpoint from './icons/components/IconCustomNoPinpoint.vue'
import IconCustomNote2 from './icons/components/IconCustomNote2.vue'
import IconCustomNote from './icons/components/IconCustomNote.vue'
import IconCustomOverlap from './icons/components/IconCustomOverlap.vue'
import IconCustomPatrol from './icons/components/IconCustomPatrol.vue'
import IconCustomPic2 from './icons/components/IconCustomPic2.vue'
import IconCustomPic from './icons/components/IconCustomPic.vue'
import IconCustomPinpointFill2 from './icons/components/IconCustomPinpointFill2.vue'
import IconCustomPinpointFill from './icons/components/IconCustomPinpointFill.vue'
import IconCustomPinpoint from './icons/components/IconCustomPinpoint.vue'
import IconCustomPlantation from './icons/components/IconCustomPlantation.vue'
import IconCustomPlay from './icons/components/IconCustomPlay.vue'
import IconCustomProject from './icons/components/IconCustomProject.vue'
import IconCustomQuantity from './icons/components/IconCustomQuantity.vue'
import IconCustomQuestion from './icons/components/IconCustomQuestion.vue'
import IconCustomRandom from './icons/components/IconCustomRandom.vue'
import IconCustomSaveNature from './icons/components/IconCustomSaveNature.vue'
import IconCustomSave from './icons/components/IconCustomSave.vue'
import IconCustomSetting from './icons/components/IconCustomSetting.vue'
import IconCustomSignManage from './icons/components/IconCustomSignManage.vue'
import IconCustomSignature from './icons/components/IconCustomSignature.vue'
import IconCustomSuccess from './icons/components/IconCustomSuccess.vue'
import IconCustomSwitch from './icons/components/IconCustomSwitch.vue'
import IconCustomTag from './icons/components/IconCustomTag.vue'
import IconCustomTask from './icons/components/IconCustomTask.vue'
import IconCustomTeam from './icons/components/IconCustomTeam.vue'
import IconCustomTicket from './icons/components/IconCustomTicket.vue'
import IconCustomTips2 from './icons/components/IconCustomTips2.vue'
import IconCustomTips from './icons/components/IconCustomTips.vue'
import IconCustomTree2 from './icons/components/IconCustomTree2.vue'
import IconCustomTree3 from './icons/components/IconCustomTree3.vue'
import IconCustomTree4 from './icons/components/IconCustomTree4.vue'
import IconCustomTree from './icons/components/IconCustomTree.vue'
import IconCustomTriangleDown from './icons/components/IconCustomTriangleDown.vue'
import IconCustomTriangleLeft from './icons/components/IconCustomTriangleLeft.vue'
import IconCustomTriangleRight from './icons/components/IconCustomTriangleRight.vue'
import IconCustomTriangleUp from './icons/components/IconCustomTriangleUp.vue'
import IconCustomUpArrow from './icons/components/IconCustomUpArrow.vue'
import IconCustomUpload from './icons/components/IconCustomUpload.vue'
import IconCustomUserAdd from './icons/components/IconCustomUserAdd.vue'
import IconCustomUserForward from './icons/components/IconCustomUserForward.vue'
import IconCustomUserRound from './icons/components/IconCustomUserRound.vue'
import IconCustomUserSuccess from './icons/components/IconCustomUserSuccess.vue'
import IconCustomUserWaiting from './icons/components/IconCustomUserWaiting.vue'
import IconCustomUser from './icons/components/IconCustomUser.vue'
import IconCustomWaiting2 from './icons/components/IconCustomWaiting2.vue'
import IconCustomWaiting from './icons/components/IconCustomWaiting.vue'
import IconCustomYunnan from './icons/components/IconCustomYunnan.vue'

const iconComponents = {
  Icon60Add,
  Icon60AreaChart,
  Icon60Area,
  Icon60Article,
  Icon60Back2,
  Icon60Back,
  Icon60Bell,
  Icon60Clear,
  Icon60Corsshair2,
  Icon60Corsshair,
  Icon60Delete,
  Icon60Download2,
  Icon60Download,
  Icon60DrawShape,
  Icon60Edit2,
  Icon60Edit,
  Icon60Exit2,
  Icon60Exit,
  Icon60Export,
  Icon60Failed,
  Icon60FileMarked,
  Icon60FolderAdd,
  Icon60Fullscreen2,
  Icon60Fullscreen,
  Icon60Function,
  Icon60Hand,
  Icon60Import2,
  Icon60Import,
  Icon60Layers,
  Icon60Left,
  Icon60Linechart,
  Icon60Location,
  Icon60Lock,
  Icon60Minimize2,
  Icon60Minimize,
  Icon60PieChart,
  Icon60Right,
  Icon60RulerMeasure,
  Icon60Safety2,
  Icon60Safety,
  Icon60ScreenChange,
  Icon60Search,
  Icon60Settings2,
  Icon60Settings,
  Icon60StatsAlt,
  Icon60Success,
  Icon60Tips2,
  Icon60Tips3,
  Icon60Tips,
  Icon60Upload,
  Icon60User,
  Icon60Volume,
  Icon60Warning,
  Icon60ZoomIn,
  Icon60ZoomOut,
  Icon80Add,
  Icon80AreaChart,
  Icon80Area,
  Icon80Article,
  Icon80Back,
  Icon80Bell,
  Icon80Clear,
  Icon80Corsshair,
  Icon80Delete,
  Icon80Down,
  Icon80Download2,
  Icon80DrawShape,
  Icon80Edit,
  Icon80Exit2,
  Icon80Exit,
  Icon80Export,
  Icon80Failed,
  Icon80FileMarked,
  Icon80FolderAdd,
  Icon80Fullscreen2,
  Icon80Fullscreen,
  Icon80Function,
  Icon80Hand,
  Icon80Height,
  Icon80Import2,
  Icon80Import,
  Icon80Layers,
  Icon80Left,
  Icon80Linechart,
  Icon80Location,
  Icon80Lock,
  Icon80Minimize2,
  Icon80Minimize,
  Icon80PieChart,
  Icon80Refresh,
  Icon80Right,
  Icon80RulerMeasure,
  Icon80Safety2,
  Icon80Safety,
  Icon80Search,
  Icon80Settings2,
  Icon80Settings,
  Icon80StatsAlt,
  Icon80Success,
  Icon80Tips2,
  Icon80Tips3,
  Icon80Tips,
  Icon80Up,
  Icon80Upload,
  Icon80User,
  Icon80Volume,
  Icon80ZoomIn,
  Icon80ZoomOut,
  Icon90Add2,
  Icon90Add,
  Icon90Alarmclock2,
  Icon90Alarmclock3,
  Icon90Alarmclock,
  Icon90Alerts,
  Icon90Animal,
  Icon90ArrowsCross,
  Icon90Article2,
  Icon90Article,
  Icon90Attach,
  Icon90Badge,
  Icon90Bell2,
  Icon90Bell,
  Icon90Bigdown,
  Icon90Bigup,
  Icon90Bike,
  Icon90Bill,
  Icon90Bluetooth,
  Icon90Board,
  Icon90BookMark,
  Icon90Book,
  Icon90Bottle,
  Icon90Box2,
  Icon90Box3,
  Icon90Box,
  Icon90Briefcase,
  Icon90Browser,
  Icon90Building2,
  Icon90Building3,
  Icon90Building4,
  Icon90Building5,
  Icon90Building6,
  Icon90Building7,
  Icon90Building,
  Icon90Bus,
  Icon90Calculator2,
  Icon90Calculator3,
  Icon90Calculator4,
  Icon90Calculator,
  Icon90Calendar,
  Icon90Camera2,
  Icon90Camera,
  Icon90Car2,
  Icon90Car,
  Icon90CardLayout,
  Icon90Card,
  Icon90Cd,
  Icon90Change2,
  Icon90Change3,
  Icon90ChangeLanguages,
  Icon90Change,
  Icon90Charity,
  Icon90Chat,
  Icon90Check,
  Icon90Checked2,
  Icon90Checked,
  Icon90Checkin,
  Icon90Child,
  Icon90Chip,
  Icon90City2,
  Icon90City,
  Icon90Classify2,
  Icon90Classify3,
  Icon90Classify4,
  Icon90Classify,
  Icon90Clear,
  Icon90Close,
  Icon90Cloud,
  Icon90Code2,
  Icon90Code3,
  Icon90Code4,
  Icon90Code,
  Icon90Coins,
  Icon90Comment,
  Icon90Connection,
  Icon90Consume,
  Icon90Correct2,
  Icon90Correct,
  Icon90Corsshair,
  Icon90Cover,
  Icon90Crop,
  Icon90Cupboard,
  Icon90Dashboard,
  Icon90Database,
  Icon90Date2,
  Icon90Date3,
  Icon90Date,
  Icon90Delete2,
  Icon90Delete,
  Icon90Device,
  Icon90Diamond,
  Icon90Dining2,
  Icon90Dining,
  Icon90Discover,
  Icon90Down2,
  Icon90Down3,
  Icon90Down4,
  Icon90Down5,
  Icon90Down,
  Icon90Download2,
  Icon90Download3,
  Icon90Download,
  Icon90DrawShape,
  Icon90Drug,
  Icon90Earth,
  Icon90Edit2,
  Icon90Edit3,
  Icon90Edit4,
  Icon90Edit,
  Icon90Elevator,
  Icon90Examine2,
  Icon90Examine3,
  Icon90Examine,
  Icon90Exit2,
  Icon90Exit,
  Icon90Expand,
  Icon90Expenses,
  Icon90Export,
  Icon90Factory,
  Icon90Failed,
  Icon90Female,
  Icon90File2,
  Icon90File3,
  Icon90File4,
  Icon90File5,
  Icon90FileAdd,
  Icon90FileReduce,
  Icon90File,
  Icon90Finish2,
  Icon90Finish,
  Icon90Fire,
  Icon90Flag2,
  Icon90Flag3,
  Icon90Flag,
  Icon90Flashlight,
  Icon90FolderAdd,
  Icon90FolderReduce,
  Icon90Folder,
  Icon90Folderopen,
  Icon90Forbid,
  Icon90Fullscreen,
  Icon90Function,
  Icon90Funnel,
  Icon90Game,
  Icon90GestureUp,
  Icon90Gift,
  Icon90Handwashing,
  Icon90Healthy,
  Icon90Help,
  Icon90Home2,
  Icon90Home3,
  Icon90Home4,
  Icon90Home5,
  Icon90Home,
  Icon90Hospital,
  Icon90Hotel,
  Icon90Hourglass2,
  Icon90Hourglass3,
  Icon90Hourglass,
  Icon90IdCard,
  Icon90Import,
  Icon90Income,
  Icon90Inquire,
  Icon90Invisible,
  Icon90Invoice,
  Icon90Key,
  Icon90Law,
  Icon90Leaf2,
  Icon90Leaf,
  Icon90Left2,
  Icon90Left3,
  Icon90Left4,
  Icon90Left5,
  Icon90Left,
  Icon90Lightbulb2,
  Icon90Lightbulb,
  Icon90Lightning2,
  Icon90Lightning3,
  Icon90Lightning,
  Icon90Linechart,
  Icon90List,
  Icon90Live2,
  Icon90Live,
  Icon90Location2,
  Icon90Location,
  Icon90Lock2,
  Icon90Lock,
  Icon90Lose,
  Icon90Mail2,
  Icon90Mail,
  Icon90Male,
  Icon90Mark,
  Icon90Medical,
  Icon90Mic2,
  Icon90Mic,
  Icon90Micmute,
  Icon90Mine4,
  Icon90Mine5,
  Icon90Minimize,
  Icon90Minus,
  Icon90Mobilephone,
  Icon90Module,
  Icon90Molecule,
  Icon90Money,
  Icon90Moneybag,
  Icon90Monitor,
  Icon90Monument2,
  Icon90Monument,
  Icon90More1,
  Icon90More2,
  Icon90More3,
  Icon90More,
  Icon90Museum,
  Icon90Mute,
  Icon90NoNotice,
  Icon90Note2,
  Icon90Note,
  Icon90Notice,
  Icon90Order,
  Icon90Paper,
  Icon90Paperplane2,
  Icon90Paperplane,
  Icon90PetrolPump,
  Icon90Pharmacy2,
  Icon90Pharmacy3,
  Icon90Pharmacy,
  Icon90Phone2,
  Icon90Phone,
  Icon90Picture,
  Icon90PieChart,
  Icon90Plane2,
  Icon90Plane,
  Icon90Play,
  Icon90PointLine,
  Icon90Print,
  Icon90Quantity,
  Icon90Question,
  Icon90Radio,
  Icon90Reboot,
  Icon90Recharge,
  Icon90Record2,
  Icon90Record,
  Icon90Reduce,
  Icon90Refresh2,
  Icon90Refresh,
  Icon90Repair,
  Icon90Repost2,
  Icon90Repost,
  Icon90Right2,
  Icon90Right3,
  Icon90Right4,
  Icon90Right5,
  Icon90Right,
  Icon90Road,
  Icon90RulerMeasure,
  Icon90Safety2,
  Icon90Safety3,
  Icon90Safety4,
  Icon90Safety,
  Icon90Save2,
  Icon90Save3,
  Icon90Save,
  Icon90ScanPay,
  Icon90School,
  Icon90Scissors,
  Icon90Search,
  Icon90Service2,
  Icon90Service3,
  Icon90Service4,
  Icon90Service,
  Icon90Setting,
  Icon90Settings,
  Icon90Share,
  Icon90Signal,
  Icon90Sitemap,
  Icon90Sound,
  Icon90Stack,
  Icon90Star,
  Icon90Staroff,
  Icon90StatsAlt2,
  Icon90StatsAlt,
  Icon90Stethoscope,
  Icon90Student,
  Icon90Subscribe,
  Icon90Table,
  Icon90Tag,
  Icon90Tapy,
  Icon90Target,
  Icon90Team2,
  Icon90Team3,
  Icon90Team4,
  Icon90Team,
  Icon90Temperature,
  Icon90ThumbsUp2,
  Icon90ThumbsUp,
  Icon90Ticket2,
  Icon90Ticket,
  Icon90Time2,
  Icon90Time,
  Icon90Tip2,
  Icon90Tip,
  Icon90Top,
  Icon90Topic,
  Icon90Trending,
  Icon90Trophy2,
  Icon90Trophy3,
  Icon90Trophy4,
  Icon90Trophy,
  Icon90Unlike,
  Icon90Up2,
  Icon90Up3,
  Icon90Up4,
  Icon90Up5,
  Icon90Up,
  Icon90Upload2,
  Icon90Upload,
  Icon90Usb,
  Icon90User2,
  Icon90User3,
  Icon90User4,
  Icon90User5,
  Icon90User6,
  Icon90User7,
  Icon90User8,
  Icon90UserAdd,
  Icon90User,
  Icon90Video,
  Icon90View2,
  Icon90View,
  Icon90Viewoff,
  Icon90Vip2,
  Icon90Vip,
  Icon90Warn2,
  Icon90Warn,
  Icon90WaterTicket,
  Icon90Water,
  Icon90Webcam2,
  Icon90Webcam,
  Icon90Wechat,
  Icon90Wifi,
  Icon90WxMiniProgram,
  Icon90Zoomin,
  Icon90Zoomout,
  IconCustom1stCert,
  IconCustom2ndCert,
  IconCustomAggregation2,
  IconCustomAggregation,
  IconCustomAmmonite2,
  IconCustomAmmonite,
  IconCustomAnimal,
  IconCustomAnnouncement,
  IconCustomArticle2,
  IconCustomArticle,
  IconCustomBack2,
  IconCustomBack3,
  IconCustomBack4,
  IconCustomBack,
  IconCustomBadge,
  IconCustomBell,
  IconCustomBox,
  IconCustomBriefcase,
  IconCustomBuilding2,
  IconCustomBuilding,
  IconCustomCalendar,
  IconCustomCart2stars,
  IconCustomCart3stars,
  IconCustomCert,
  IconCustomChange2,
  IconCustomChange,
  IconCustomChat,
  IconCustomContrast,
  IconCustomData,
  IconCustomDelete2,
  IconCustomDelete,
  IconCustomDetails,
  IconCustomDownArrow,
  IconCustomDrawers2,
  IconCustomDrawers,
  IconCustomEdit,
  IconCustomExamine,
  IconCustomFailed,
  IconCustomFileFailed,
  IconCustomFileForward,
  IconCustomFileFound,
  IconCustomFileSuccess2,
  IconCustomFileSuccess,
  IconCustomFileUpload2,
  IconCustomFileUpload,
  IconCustomFileWaiting,
  IconCustomFile,
  IconCustomFiles,
  IconCustomFillExamine,
  IconCustomFolderOpen,
  IconCustomFolder,
  IconCustomGuide,
  IconCustomHome,
  IconCustomLand,
  IconCustomLayers2,
  IconCustomLayers,
  IconCustomLeaf2,
  IconCustomLeaf,
  IconCustomLedger,
  IconCustomLifted,
  IconCustomLockOpen,
  IconCustomLock,
  IconCustomMark,
  IconCustomMolecule,
  IconCustomMoney,
  IconCustomMonitor2,
  IconCustomMonitor,
  IconCustomMonumentManage,
  IconCustomMountain2,
  IconCustomMountain3,
  IconCustomMountain,
  IconCustomNoPinpoint,
  IconCustomNote2,
  IconCustomNote,
  IconCustomOverlap,
  IconCustomPatrol,
  IconCustomPic2,
  IconCustomPic,
  IconCustomPinpointFill2,
  IconCustomPinpointFill,
  IconCustomPinpoint,
  IconCustomPlantation,
  IconCustomPlay,
  IconCustomProject,
  IconCustomQuantity,
  IconCustomQuestion,
  IconCustomRandom,
  IconCustomSaveNature,
  IconCustomSave,
  IconCustomSetting,
  IconCustomSignManage,
  IconCustomSignature,
  IconCustomSuccess,
  IconCustomSwitch,
  IconCustomTag,
  IconCustomTask,
  IconCustomTeam,
  IconCustomTicket,
  IconCustomTips2,
  IconCustomTips,
  IconCustomTree2,
  IconCustomTree3,
  IconCustomTree4,
  IconCustomTree,
  IconCustomTriangleDown,
  IconCustomTriangleLeft,
  IconCustomTriangleRight,
  IconCustomTriangleUp,
  IconCustomUpArrow,
  IconCustomUpload,
  IconCustomUserAdd,
  IconCustomUserForward,
  IconCustomUserRound,
  IconCustomUserSuccess,
  IconCustomUserWaiting,
  IconCustomUser,
  IconCustomWaiting2,
  IconCustomWaiting,
  IconCustomYunnan,
}

function install(app: App, options: HdiUiInstallOptions = {}) {
  // 注册业务组件和指令（静态维护，与图标无关）
  installBusinessComponents(app, options)
  // 注册图标组件
  for (const [name, comp] of Object.entries(iconComponents)) {
    app.component(name, comp as never)
    app.component(toKebabName(name), comp as never)
  }
}

export { install }
export * from './install-components'
export { Icon60Add }
export { Icon60AreaChart }
export { Icon60Area }
export { Icon60Article }
export { Icon60Back2 }
export { Icon60Back }
export { Icon60Bell }
export { Icon60Clear }
export { Icon60Corsshair2 }
export { Icon60Corsshair }
export { Icon60Delete }
export { Icon60Download2 }
export { Icon60Download }
export { Icon60DrawShape }
export { Icon60Edit2 }
export { Icon60Edit }
export { Icon60Exit2 }
export { Icon60Exit }
export { Icon60Export }
export { Icon60Failed }
export { Icon60FileMarked }
export { Icon60FolderAdd }
export { Icon60Fullscreen2 }
export { Icon60Fullscreen }
export { Icon60Function }
export { Icon60Hand }
export { Icon60Import2 }
export { Icon60Import }
export { Icon60Layers }
export { Icon60Left }
export { Icon60Linechart }
export { Icon60Location }
export { Icon60Lock }
export { Icon60Minimize2 }
export { Icon60Minimize }
export { Icon60PieChart }
export { Icon60Right }
export { Icon60RulerMeasure }
export { Icon60Safety2 }
export { Icon60Safety }
export { Icon60ScreenChange }
export { Icon60Search }
export { Icon60Settings2 }
export { Icon60Settings }
export { Icon60StatsAlt }
export { Icon60Success }
export { Icon60Tips2 }
export { Icon60Tips3 }
export { Icon60Tips }
export { Icon60Upload }
export { Icon60User }
export { Icon60Volume }
export { Icon60Warning }
export { Icon60ZoomIn }
export { Icon60ZoomOut }
export { Icon80Add }
export { Icon80AreaChart }
export { Icon80Area }
export { Icon80Article }
export { Icon80Back }
export { Icon80Bell }
export { Icon80Clear }
export { Icon80Corsshair }
export { Icon80Delete }
export { Icon80Down }
export { Icon80Download2 }
export { Icon80DrawShape }
export { Icon80Edit }
export { Icon80Exit2 }
export { Icon80Exit }
export { Icon80Export }
export { Icon80Failed }
export { Icon80FileMarked }
export { Icon80FolderAdd }
export { Icon80Fullscreen2 }
export { Icon80Fullscreen }
export { Icon80Function }
export { Icon80Hand }
export { Icon80Height }
export { Icon80Import2 }
export { Icon80Import }
export { Icon80Layers }
export { Icon80Left }
export { Icon80Linechart }
export { Icon80Location }
export { Icon80Lock }
export { Icon80Minimize2 }
export { Icon80Minimize }
export { Icon80PieChart }
export { Icon80Refresh }
export { Icon80Right }
export { Icon80RulerMeasure }
export { Icon80Safety2 }
export { Icon80Safety }
export { Icon80Search }
export { Icon80Settings2 }
export { Icon80Settings }
export { Icon80StatsAlt }
export { Icon80Success }
export { Icon80Tips2 }
export { Icon80Tips3 }
export { Icon80Tips }
export { Icon80Up }
export { Icon80Upload }
export { Icon80User }
export { Icon80Volume }
export { Icon80ZoomIn }
export { Icon80ZoomOut }
export { Icon90Add2 }
export { Icon90Add }
export { Icon90Alarmclock2 }
export { Icon90Alarmclock3 }
export { Icon90Alarmclock }
export { Icon90Alerts }
export { Icon90Animal }
export { Icon90ArrowsCross }
export { Icon90Article2 }
export { Icon90Article }
export { Icon90Attach }
export { Icon90Badge }
export { Icon90Bell2 }
export { Icon90Bell }
export { Icon90Bigdown }
export { Icon90Bigup }
export { Icon90Bike }
export { Icon90Bill }
export { Icon90Bluetooth }
export { Icon90Board }
export { Icon90BookMark }
export { Icon90Book }
export { Icon90Bottle }
export { Icon90Box2 }
export { Icon90Box3 }
export { Icon90Box }
export { Icon90Briefcase }
export { Icon90Browser }
export { Icon90Building2 }
export { Icon90Building3 }
export { Icon90Building4 }
export { Icon90Building5 }
export { Icon90Building6 }
export { Icon90Building7 }
export { Icon90Building }
export { Icon90Bus }
export { Icon90Calculator2 }
export { Icon90Calculator3 }
export { Icon90Calculator4 }
export { Icon90Calculator }
export { Icon90Calendar }
export { Icon90Camera2 }
export { Icon90Camera }
export { Icon90Car2 }
export { Icon90Car }
export { Icon90CardLayout }
export { Icon90Card }
export { Icon90Cd }
export { Icon90Change2 }
export { Icon90Change3 }
export { Icon90ChangeLanguages }
export { Icon90Change }
export { Icon90Charity }
export { Icon90Chat }
export { Icon90Check }
export { Icon90Checked2 }
export { Icon90Checked }
export { Icon90Checkin }
export { Icon90Child }
export { Icon90Chip }
export { Icon90City2 }
export { Icon90City }
export { Icon90Classify2 }
export { Icon90Classify3 }
export { Icon90Classify4 }
export { Icon90Classify }
export { Icon90Clear }
export { Icon90Close }
export { Icon90Cloud }
export { Icon90Code2 }
export { Icon90Code3 }
export { Icon90Code4 }
export { Icon90Code }
export { Icon90Coins }
export { Icon90Comment }
export { Icon90Connection }
export { Icon90Consume }
export { Icon90Correct2 }
export { Icon90Correct }
export { Icon90Corsshair }
export { Icon90Cover }
export { Icon90Crop }
export { Icon90Cupboard }
export { Icon90Dashboard }
export { Icon90Database }
export { Icon90Date2 }
export { Icon90Date3 }
export { Icon90Date }
export { Icon90Delete2 }
export { Icon90Delete }
export { Icon90Device }
export { Icon90Diamond }
export { Icon90Dining2 }
export { Icon90Dining }
export { Icon90Discover }
export { Icon90Down2 }
export { Icon90Down3 }
export { Icon90Down4 }
export { Icon90Down5 }
export { Icon90Down }
export { Icon90Download2 }
export { Icon90Download3 }
export { Icon90Download }
export { Icon90DrawShape }
export { Icon90Drug }
export { Icon90Earth }
export { Icon90Edit2 }
export { Icon90Edit3 }
export { Icon90Edit4 }
export { Icon90Edit }
export { Icon90Elevator }
export { Icon90Examine2 }
export { Icon90Examine3 }
export { Icon90Examine }
export { Icon90Exit2 }
export { Icon90Exit }
export { Icon90Expand }
export { Icon90Expenses }
export { Icon90Export }
export { Icon90Factory }
export { Icon90Failed }
export { Icon90Female }
export { Icon90File2 }
export { Icon90File3 }
export { Icon90File4 }
export { Icon90File5 }
export { Icon90FileAdd }
export { Icon90FileReduce }
export { Icon90File }
export { Icon90Finish2 }
export { Icon90Finish }
export { Icon90Fire }
export { Icon90Flag2 }
export { Icon90Flag3 }
export { Icon90Flag }
export { Icon90Flashlight }
export { Icon90FolderAdd }
export { Icon90FolderReduce }
export { Icon90Folder }
export { Icon90Folderopen }
export { Icon90Forbid }
export { Icon90Fullscreen }
export { Icon90Function }
export { Icon90Funnel }
export { Icon90Game }
export { Icon90GestureUp }
export { Icon90Gift }
export { Icon90Handwashing }
export { Icon90Healthy }
export { Icon90Help }
export { Icon90Home2 }
export { Icon90Home3 }
export { Icon90Home4 }
export { Icon90Home5 }
export { Icon90Home }
export { Icon90Hospital }
export { Icon90Hotel }
export { Icon90Hourglass2 }
export { Icon90Hourglass3 }
export { Icon90Hourglass }
export { Icon90IdCard }
export { Icon90Import }
export { Icon90Income }
export { Icon90Inquire }
export { Icon90Invisible }
export { Icon90Invoice }
export { Icon90Key }
export { Icon90Law }
export { Icon90Leaf2 }
export { Icon90Leaf }
export { Icon90Left2 }
export { Icon90Left3 }
export { Icon90Left4 }
export { Icon90Left5 }
export { Icon90Left }
export { Icon90Lightbulb2 }
export { Icon90Lightbulb }
export { Icon90Lightning2 }
export { Icon90Lightning3 }
export { Icon90Lightning }
export { Icon90Linechart }
export { Icon90List }
export { Icon90Live2 }
export { Icon90Live }
export { Icon90Location2 }
export { Icon90Location }
export { Icon90Lock2 }
export { Icon90Lock }
export { Icon90Lose }
export { Icon90Mail2 }
export { Icon90Mail }
export { Icon90Male }
export { Icon90Mark }
export { Icon90Medical }
export { Icon90Mic2 }
export { Icon90Mic }
export { Icon90Micmute }
export { Icon90Mine4 }
export { Icon90Mine5 }
export { Icon90Minimize }
export { Icon90Minus }
export { Icon90Mobilephone }
export { Icon90Module }
export { Icon90Molecule }
export { Icon90Money }
export { Icon90Moneybag }
export { Icon90Monitor }
export { Icon90Monument2 }
export { Icon90Monument }
export { Icon90More1 }
export { Icon90More2 }
export { Icon90More3 }
export { Icon90More }
export { Icon90Museum }
export { Icon90Mute }
export { Icon90NoNotice }
export { Icon90Note2 }
export { Icon90Note }
export { Icon90Notice }
export { Icon90Order }
export { Icon90Paper }
export { Icon90Paperplane2 }
export { Icon90Paperplane }
export { Icon90PetrolPump }
export { Icon90Pharmacy2 }
export { Icon90Pharmacy3 }
export { Icon90Pharmacy }
export { Icon90Phone2 }
export { Icon90Phone }
export { Icon90Picture }
export { Icon90PieChart }
export { Icon90Plane2 }
export { Icon90Plane }
export { Icon90Play }
export { Icon90PointLine }
export { Icon90Print }
export { Icon90Quantity }
export { Icon90Question }
export { Icon90Radio }
export { Icon90Reboot }
export { Icon90Recharge }
export { Icon90Record2 }
export { Icon90Record }
export { Icon90Reduce }
export { Icon90Refresh2 }
export { Icon90Refresh }
export { Icon90Repair }
export { Icon90Repost2 }
export { Icon90Repost }
export { Icon90Right2 }
export { Icon90Right3 }
export { Icon90Right4 }
export { Icon90Right5 }
export { Icon90Right }
export { Icon90Road }
export { Icon90RulerMeasure }
export { Icon90Safety2 }
export { Icon90Safety3 }
export { Icon90Safety4 }
export { Icon90Safety }
export { Icon90Save2 }
export { Icon90Save3 }
export { Icon90Save }
export { Icon90ScanPay }
export { Icon90School }
export { Icon90Scissors }
export { Icon90Search }
export { Icon90Service2 }
export { Icon90Service3 }
export { Icon90Service4 }
export { Icon90Service }
export { Icon90Setting }
export { Icon90Settings }
export { Icon90Share }
export { Icon90Signal }
export { Icon90Sitemap }
export { Icon90Sound }
export { Icon90Stack }
export { Icon90Star }
export { Icon90Staroff }
export { Icon90StatsAlt2 }
export { Icon90StatsAlt }
export { Icon90Stethoscope }
export { Icon90Student }
export { Icon90Subscribe }
export { Icon90Table }
export { Icon90Tag }
export { Icon90Tapy }
export { Icon90Target }
export { Icon90Team2 }
export { Icon90Team3 }
export { Icon90Team4 }
export { Icon90Team }
export { Icon90Temperature }
export { Icon90ThumbsUp2 }
export { Icon90ThumbsUp }
export { Icon90Ticket2 }
export { Icon90Ticket }
export { Icon90Time2 }
export { Icon90Time }
export { Icon90Tip2 }
export { Icon90Tip }
export { Icon90Top }
export { Icon90Topic }
export { Icon90Trending }
export { Icon90Trophy2 }
export { Icon90Trophy3 }
export { Icon90Trophy4 }
export { Icon90Trophy }
export { Icon90Unlike }
export { Icon90Up2 }
export { Icon90Up3 }
export { Icon90Up4 }
export { Icon90Up5 }
export { Icon90Up }
export { Icon90Upload2 }
export { Icon90Upload }
export { Icon90Usb }
export { Icon90User2 }
export { Icon90User3 }
export { Icon90User4 }
export { Icon90User5 }
export { Icon90User6 }
export { Icon90User7 }
export { Icon90User8 }
export { Icon90UserAdd }
export { Icon90User }
export { Icon90Video }
export { Icon90View2 }
export { Icon90View }
export { Icon90Viewoff }
export { Icon90Vip2 }
export { Icon90Vip }
export { Icon90Warn2 }
export { Icon90Warn }
export { Icon90WaterTicket }
export { Icon90Water }
export { Icon90Webcam2 }
export { Icon90Webcam }
export { Icon90Wechat }
export { Icon90Wifi }
export { Icon90WxMiniProgram }
export { Icon90Zoomin }
export { Icon90Zoomout }
export { IconCustom1stCert }
export { IconCustom2ndCert }
export { IconCustomAggregation2 }
export { IconCustomAggregation }
export { IconCustomAmmonite2 }
export { IconCustomAmmonite }
export { IconCustomAnimal }
export { IconCustomAnnouncement }
export { IconCustomArticle2 }
export { IconCustomArticle }
export { IconCustomBack2 }
export { IconCustomBack3 }
export { IconCustomBack4 }
export { IconCustomBack }
export { IconCustomBadge }
export { IconCustomBell }
export { IconCustomBox }
export { IconCustomBriefcase }
export { IconCustomBuilding2 }
export { IconCustomBuilding }
export { IconCustomCalendar }
export { IconCustomCart2stars }
export { IconCustomCart3stars }
export { IconCustomCert }
export { IconCustomChange2 }
export { IconCustomChange }
export { IconCustomChat }
export { IconCustomContrast }
export { IconCustomData }
export { IconCustomDelete2 }
export { IconCustomDelete }
export { IconCustomDetails }
export { IconCustomDownArrow }
export { IconCustomDrawers2 }
export { IconCustomDrawers }
export { IconCustomEdit }
export { IconCustomExamine }
export { IconCustomFailed }
export { IconCustomFileFailed }
export { IconCustomFileForward }
export { IconCustomFileFound }
export { IconCustomFileSuccess2 }
export { IconCustomFileSuccess }
export { IconCustomFileUpload2 }
export { IconCustomFileUpload }
export { IconCustomFileWaiting }
export { IconCustomFile }
export { IconCustomFiles }
export { IconCustomFillExamine }
export { IconCustomFolderOpen }
export { IconCustomFolder }
export { IconCustomGuide }
export { IconCustomHome }
export { IconCustomLand }
export { IconCustomLayers2 }
export { IconCustomLayers }
export { IconCustomLeaf2 }
export { IconCustomLeaf }
export { IconCustomLedger }
export { IconCustomLifted }
export { IconCustomLockOpen }
export { IconCustomLock }
export { IconCustomMark }
export { IconCustomMolecule }
export { IconCustomMoney }
export { IconCustomMonitor2 }
export { IconCustomMonitor }
export { IconCustomMonumentManage }
export { IconCustomMountain2 }
export { IconCustomMountain3 }
export { IconCustomMountain }
export { IconCustomNoPinpoint }
export { IconCustomNote2 }
export { IconCustomNote }
export { IconCustomOverlap }
export { IconCustomPatrol }
export { IconCustomPic2 }
export { IconCustomPic }
export { IconCustomPinpointFill2 }
export { IconCustomPinpointFill }
export { IconCustomPinpoint }
export { IconCustomPlantation }
export { IconCustomPlay }
export { IconCustomProject }
export { IconCustomQuantity }
export { IconCustomQuestion }
export { IconCustomRandom }
export { IconCustomSaveNature }
export { IconCustomSave }
export { IconCustomSetting }
export { IconCustomSignManage }
export { IconCustomSignature }
export { IconCustomSuccess }
export { IconCustomSwitch }
export { IconCustomTag }
export { IconCustomTask }
export { IconCustomTeam }
export { IconCustomTicket }
export { IconCustomTips2 }
export { IconCustomTips }
export { IconCustomTree2 }
export { IconCustomTree3 }
export { IconCustomTree4 }
export { IconCustomTree }
export { IconCustomTriangleDown }
export { IconCustomTriangleLeft }
export { IconCustomTriangleRight }
export { IconCustomTriangleUp }
export { IconCustomUpArrow }
export { IconCustomUpload }
export { IconCustomUserAdd }
export { IconCustomUserForward }
export { IconCustomUserRound }
export { IconCustomUserSuccess }
export { IconCustomUserWaiting }
export { IconCustomUser }
export { IconCustomWaiting2 }
export { IconCustomWaiting }
export { IconCustomYunnan }
