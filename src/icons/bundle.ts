/**
 * UMD 打包入口 - 供 HTML 页面通过 CDN 引入 Vue 后使用
 * 由 generate-icons.ts 自动生成，请勿手动修改
 *
 * UMD 全局变量 HdiIcons 结构: { install, IconBase, HdiIcon, Icon80Add, ... }
 * app.use(HdiIcons) 会调用 install 注册全部图标组件
 */
import type { App } from 'vue'
import IconBase from '../components/Icon/IconBase.vue'
import HdiIcon from '../components/Icon/Icon.vue'
import { toKebabName } from '../utils/kebab'
import Icon60Add from './components/Icon60Add.vue'
import Icon60AreaChart from './components/Icon60AreaChart.vue'
import Icon60Area from './components/Icon60Area.vue'
import Icon60Article from './components/Icon60Article.vue'
import Icon60Back2 from './components/Icon60Back2.vue'
import Icon60Back from './components/Icon60Back.vue'
import Icon60Bell from './components/Icon60Bell.vue'
import Icon60Clear from './components/Icon60Clear.vue'
import Icon60Corsshair2 from './components/Icon60Corsshair2.vue'
import Icon60Corsshair from './components/Icon60Corsshair.vue'
import Icon60Delete from './components/Icon60Delete.vue'
import Icon60Download2 from './components/Icon60Download2.vue'
import Icon60Download from './components/Icon60Download.vue'
import Icon60DrawShape from './components/Icon60DrawShape.vue'
import Icon60Edit2 from './components/Icon60Edit2.vue'
import Icon60Edit from './components/Icon60Edit.vue'
import Icon60Exit2 from './components/Icon60Exit2.vue'
import Icon60Exit from './components/Icon60Exit.vue'
import Icon60Export from './components/Icon60Export.vue'
import Icon60Failed from './components/Icon60Failed.vue'
import Icon60FileMarked from './components/Icon60FileMarked.vue'
import Icon60FolderAdd from './components/Icon60FolderAdd.vue'
import Icon60Fullscreen2 from './components/Icon60Fullscreen2.vue'
import Icon60Fullscreen from './components/Icon60Fullscreen.vue'
import Icon60Function from './components/Icon60Function.vue'
import Icon60Hand from './components/Icon60Hand.vue'
import Icon60Import2 from './components/Icon60Import2.vue'
import Icon60Import from './components/Icon60Import.vue'
import Icon60Layers from './components/Icon60Layers.vue'
import Icon60Left from './components/Icon60Left.vue'
import Icon60Linechart from './components/Icon60Linechart.vue'
import Icon60Location from './components/Icon60Location.vue'
import Icon60Lock from './components/Icon60Lock.vue'
import Icon60Minimize2 from './components/Icon60Minimize2.vue'
import Icon60Minimize from './components/Icon60Minimize.vue'
import Icon60PieChart from './components/Icon60PieChart.vue'
import Icon60Right from './components/Icon60Right.vue'
import Icon60RulerMeasure from './components/Icon60RulerMeasure.vue'
import Icon60Safety2 from './components/Icon60Safety2.vue'
import Icon60Safety from './components/Icon60Safety.vue'
import Icon60ScreenChange from './components/Icon60ScreenChange.vue'
import Icon60Search from './components/Icon60Search.vue'
import Icon60Settings2 from './components/Icon60Settings2.vue'
import Icon60Settings from './components/Icon60Settings.vue'
import Icon60StatsAlt from './components/Icon60StatsAlt.vue'
import Icon60Success from './components/Icon60Success.vue'
import Icon60Tips2 from './components/Icon60Tips2.vue'
import Icon60Tips3 from './components/Icon60Tips3.vue'
import Icon60Tips from './components/Icon60Tips.vue'
import Icon60Upload from './components/Icon60Upload.vue'
import Icon60User from './components/Icon60User.vue'
import Icon60Volume from './components/Icon60Volume.vue'
import Icon60Warning from './components/Icon60Warning.vue'
import Icon60ZoomIn from './components/Icon60ZoomIn.vue'
import Icon60ZoomOut from './components/Icon60ZoomOut.vue'
import Icon80Add from './components/Icon80Add.vue'
import Icon80AreaChart from './components/Icon80AreaChart.vue'
import Icon80Area from './components/Icon80Area.vue'
import Icon80Article from './components/Icon80Article.vue'
import Icon80Back from './components/Icon80Back.vue'
import Icon80Bell from './components/Icon80Bell.vue'
import Icon80Clear from './components/Icon80Clear.vue'
import Icon80Corsshair from './components/Icon80Corsshair.vue'
import Icon80Delete from './components/Icon80Delete.vue'
import Icon80Down from './components/Icon80Down.vue'
import Icon80Download2 from './components/Icon80Download2.vue'
import Icon80DrawShape from './components/Icon80DrawShape.vue'
import Icon80Edit from './components/Icon80Edit.vue'
import Icon80Exit2 from './components/Icon80Exit2.vue'
import Icon80Exit from './components/Icon80Exit.vue'
import Icon80Export from './components/Icon80Export.vue'
import Icon80Failed from './components/Icon80Failed.vue'
import Icon80FileMarked from './components/Icon80FileMarked.vue'
import Icon80FolderAdd from './components/Icon80FolderAdd.vue'
import Icon80Fullscreen2 from './components/Icon80Fullscreen2.vue'
import Icon80Fullscreen from './components/Icon80Fullscreen.vue'
import Icon80Function from './components/Icon80Function.vue'
import Icon80Hand from './components/Icon80Hand.vue'
import Icon80Height from './components/Icon80Height.vue'
import Icon80Import2 from './components/Icon80Import2.vue'
import Icon80Import from './components/Icon80Import.vue'
import Icon80Layers from './components/Icon80Layers.vue'
import Icon80Left from './components/Icon80Left.vue'
import Icon80Linechart from './components/Icon80Linechart.vue'
import Icon80Location from './components/Icon80Location.vue'
import Icon80Lock from './components/Icon80Lock.vue'
import Icon80Minimize2 from './components/Icon80Minimize2.vue'
import Icon80Minimize from './components/Icon80Minimize.vue'
import Icon80PieChart from './components/Icon80PieChart.vue'
import Icon80Refresh from './components/Icon80Refresh.vue'
import Icon80Right from './components/Icon80Right.vue'
import Icon80RulerMeasure from './components/Icon80RulerMeasure.vue'
import Icon80Safety2 from './components/Icon80Safety2.vue'
import Icon80Safety from './components/Icon80Safety.vue'
import Icon80Search from './components/Icon80Search.vue'
import Icon80Settings2 from './components/Icon80Settings2.vue'
import Icon80Settings from './components/Icon80Settings.vue'
import Icon80StatsAlt from './components/Icon80StatsAlt.vue'
import Icon80Success from './components/Icon80Success.vue'
import Icon80Tips2 from './components/Icon80Tips2.vue'
import Icon80Tips3 from './components/Icon80Tips3.vue'
import Icon80Tips from './components/Icon80Tips.vue'
import Icon80Up from './components/Icon80Up.vue'
import Icon80Upload from './components/Icon80Upload.vue'
import Icon80User from './components/Icon80User.vue'
import Icon80Volume from './components/Icon80Volume.vue'
import Icon80ZoomIn from './components/Icon80ZoomIn.vue'
import Icon80ZoomOut from './components/Icon80ZoomOut.vue'
import Icon90Add2 from './components/Icon90Add2.vue'
import Icon90Add from './components/Icon90Add.vue'
import Icon90Alarmclock2 from './components/Icon90Alarmclock2.vue'
import Icon90Alarmclock3 from './components/Icon90Alarmclock3.vue'
import Icon90Alarmclock from './components/Icon90Alarmclock.vue'
import Icon90Alerts from './components/Icon90Alerts.vue'
import Icon90Animal from './components/Icon90Animal.vue'
import Icon90ArrowsCross from './components/Icon90ArrowsCross.vue'
import Icon90Article2 from './components/Icon90Article2.vue'
import Icon90Article from './components/Icon90Article.vue'
import Icon90Attach from './components/Icon90Attach.vue'
import Icon90Badge from './components/Icon90Badge.vue'
import Icon90Bell2 from './components/Icon90Bell2.vue'
import Icon90Bell from './components/Icon90Bell.vue'
import Icon90Bigdown from './components/Icon90Bigdown.vue'
import Icon90Bigup from './components/Icon90Bigup.vue'
import Icon90Bike from './components/Icon90Bike.vue'
import Icon90Bill from './components/Icon90Bill.vue'
import Icon90Bluetooth from './components/Icon90Bluetooth.vue'
import Icon90Board from './components/Icon90Board.vue'
import Icon90BookMark from './components/Icon90BookMark.vue'
import Icon90Book from './components/Icon90Book.vue'
import Icon90Bottle from './components/Icon90Bottle.vue'
import Icon90Box2 from './components/Icon90Box2.vue'
import Icon90Box3 from './components/Icon90Box3.vue'
import Icon90Box from './components/Icon90Box.vue'
import Icon90Briefcase from './components/Icon90Briefcase.vue'
import Icon90Browser from './components/Icon90Browser.vue'
import Icon90Building2 from './components/Icon90Building2.vue'
import Icon90Building3 from './components/Icon90Building3.vue'
import Icon90Building4 from './components/Icon90Building4.vue'
import Icon90Building5 from './components/Icon90Building5.vue'
import Icon90Building6 from './components/Icon90Building6.vue'
import Icon90Building7 from './components/Icon90Building7.vue'
import Icon90Building from './components/Icon90Building.vue'
import Icon90Bus from './components/Icon90Bus.vue'
import Icon90Calculator2 from './components/Icon90Calculator2.vue'
import Icon90Calculator3 from './components/Icon90Calculator3.vue'
import Icon90Calculator4 from './components/Icon90Calculator4.vue'
import Icon90Calculator from './components/Icon90Calculator.vue'
import Icon90Calendar from './components/Icon90Calendar.vue'
import Icon90Camera2 from './components/Icon90Camera2.vue'
import Icon90Camera from './components/Icon90Camera.vue'
import Icon90Car2 from './components/Icon90Car2.vue'
import Icon90Car from './components/Icon90Car.vue'
import Icon90CardLayout from './components/Icon90CardLayout.vue'
import Icon90Card from './components/Icon90Card.vue'
import Icon90Cd from './components/Icon90Cd.vue'
import Icon90Change2 from './components/Icon90Change2.vue'
import Icon90Change3 from './components/Icon90Change3.vue'
import Icon90ChangeLanguages from './components/Icon90ChangeLanguages.vue'
import Icon90Change from './components/Icon90Change.vue'
import Icon90Charity from './components/Icon90Charity.vue'
import Icon90Chat from './components/Icon90Chat.vue'
import Icon90Check from './components/Icon90Check.vue'
import Icon90Checked2 from './components/Icon90Checked2.vue'
import Icon90Checked from './components/Icon90Checked.vue'
import Icon90Checkin from './components/Icon90Checkin.vue'
import Icon90Child from './components/Icon90Child.vue'
import Icon90Chip from './components/Icon90Chip.vue'
import Icon90City2 from './components/Icon90City2.vue'
import Icon90City from './components/Icon90City.vue'
import Icon90Classify2 from './components/Icon90Classify2.vue'
import Icon90Classify3 from './components/Icon90Classify3.vue'
import Icon90Classify4 from './components/Icon90Classify4.vue'
import Icon90Classify from './components/Icon90Classify.vue'
import Icon90Clear from './components/Icon90Clear.vue'
import Icon90Close from './components/Icon90Close.vue'
import Icon90Cloud from './components/Icon90Cloud.vue'
import Icon90Code2 from './components/Icon90Code2.vue'
import Icon90Code3 from './components/Icon90Code3.vue'
import Icon90Code4 from './components/Icon90Code4.vue'
import Icon90Code from './components/Icon90Code.vue'
import Icon90Coins from './components/Icon90Coins.vue'
import Icon90Comment from './components/Icon90Comment.vue'
import Icon90Connection from './components/Icon90Connection.vue'
import Icon90Consume from './components/Icon90Consume.vue'
import Icon90Correct2 from './components/Icon90Correct2.vue'
import Icon90Correct from './components/Icon90Correct.vue'
import Icon90Corsshair from './components/Icon90Corsshair.vue'
import Icon90Cover from './components/Icon90Cover.vue'
import Icon90Crop from './components/Icon90Crop.vue'
import Icon90Cupboard from './components/Icon90Cupboard.vue'
import Icon90Dashboard from './components/Icon90Dashboard.vue'
import Icon90Database from './components/Icon90Database.vue'
import Icon90Date2 from './components/Icon90Date2.vue'
import Icon90Date3 from './components/Icon90Date3.vue'
import Icon90Date from './components/Icon90Date.vue'
import Icon90Delete2 from './components/Icon90Delete2.vue'
import Icon90Delete from './components/Icon90Delete.vue'
import Icon90Device from './components/Icon90Device.vue'
import Icon90Diamond from './components/Icon90Diamond.vue'
import Icon90Dining2 from './components/Icon90Dining2.vue'
import Icon90Dining from './components/Icon90Dining.vue'
import Icon90Discover from './components/Icon90Discover.vue'
import Icon90Down2 from './components/Icon90Down2.vue'
import Icon90Down3 from './components/Icon90Down3.vue'
import Icon90Down4 from './components/Icon90Down4.vue'
import Icon90Down5 from './components/Icon90Down5.vue'
import Icon90Down from './components/Icon90Down.vue'
import Icon90Download2 from './components/Icon90Download2.vue'
import Icon90Download3 from './components/Icon90Download3.vue'
import Icon90Download from './components/Icon90Download.vue'
import Icon90DrawShape from './components/Icon90DrawShape.vue'
import Icon90Drug from './components/Icon90Drug.vue'
import Icon90Earth from './components/Icon90Earth.vue'
import Icon90Edit2 from './components/Icon90Edit2.vue'
import Icon90Edit3 from './components/Icon90Edit3.vue'
import Icon90Edit4 from './components/Icon90Edit4.vue'
import Icon90Edit from './components/Icon90Edit.vue'
import Icon90Elevator from './components/Icon90Elevator.vue'
import Icon90Examine2 from './components/Icon90Examine2.vue'
import Icon90Examine3 from './components/Icon90Examine3.vue'
import Icon90Examine from './components/Icon90Examine.vue'
import Icon90Exit2 from './components/Icon90Exit2.vue'
import Icon90Exit from './components/Icon90Exit.vue'
import Icon90Expand from './components/Icon90Expand.vue'
import Icon90Expenses from './components/Icon90Expenses.vue'
import Icon90Export from './components/Icon90Export.vue'
import Icon90Factory from './components/Icon90Factory.vue'
import Icon90Failed from './components/Icon90Failed.vue'
import Icon90Female from './components/Icon90Female.vue'
import Icon90File2 from './components/Icon90File2.vue'
import Icon90File3 from './components/Icon90File3.vue'
import Icon90File4 from './components/Icon90File4.vue'
import Icon90File5 from './components/Icon90File5.vue'
import Icon90FileAdd from './components/Icon90FileAdd.vue'
import Icon90FileReduce from './components/Icon90FileReduce.vue'
import Icon90File from './components/Icon90File.vue'
import Icon90Finish2 from './components/Icon90Finish2.vue'
import Icon90Finish from './components/Icon90Finish.vue'
import Icon90Fire from './components/Icon90Fire.vue'
import Icon90Flag2 from './components/Icon90Flag2.vue'
import Icon90Flag3 from './components/Icon90Flag3.vue'
import Icon90Flag from './components/Icon90Flag.vue'
import Icon90Flashlight from './components/Icon90Flashlight.vue'
import Icon90FolderAdd from './components/Icon90FolderAdd.vue'
import Icon90FolderReduce from './components/Icon90FolderReduce.vue'
import Icon90Folder from './components/Icon90Folder.vue'
import Icon90Folderopen from './components/Icon90Folderopen.vue'
import Icon90Forbid from './components/Icon90Forbid.vue'
import Icon90Fullscreen from './components/Icon90Fullscreen.vue'
import Icon90Function from './components/Icon90Function.vue'
import Icon90Funnel from './components/Icon90Funnel.vue'
import Icon90Game from './components/Icon90Game.vue'
import Icon90GestureUp from './components/Icon90GestureUp.vue'
import Icon90Gift from './components/Icon90Gift.vue'
import Icon90Handwashing from './components/Icon90Handwashing.vue'
import Icon90Healthy from './components/Icon90Healthy.vue'
import Icon90Help from './components/Icon90Help.vue'
import Icon90Home2 from './components/Icon90Home2.vue'
import Icon90Home3 from './components/Icon90Home3.vue'
import Icon90Home4 from './components/Icon90Home4.vue'
import Icon90Home5 from './components/Icon90Home5.vue'
import Icon90Home from './components/Icon90Home.vue'
import Icon90Hospital from './components/Icon90Hospital.vue'
import Icon90Hotel from './components/Icon90Hotel.vue'
import Icon90Hourglass2 from './components/Icon90Hourglass2.vue'
import Icon90Hourglass3 from './components/Icon90Hourglass3.vue'
import Icon90Hourglass from './components/Icon90Hourglass.vue'
import Icon90IdCard from './components/Icon90IdCard.vue'
import Icon90Import from './components/Icon90Import.vue'
import Icon90Income from './components/Icon90Income.vue'
import Icon90Inquire from './components/Icon90Inquire.vue'
import Icon90Invisible from './components/Icon90Invisible.vue'
import Icon90Invoice from './components/Icon90Invoice.vue'
import Icon90Key from './components/Icon90Key.vue'
import Icon90Law from './components/Icon90Law.vue'
import Icon90Leaf2 from './components/Icon90Leaf2.vue'
import Icon90Leaf from './components/Icon90Leaf.vue'
import Icon90Left2 from './components/Icon90Left2.vue'
import Icon90Left3 from './components/Icon90Left3.vue'
import Icon90Left4 from './components/Icon90Left4.vue'
import Icon90Left5 from './components/Icon90Left5.vue'
import Icon90Left from './components/Icon90Left.vue'
import Icon90Lightbulb2 from './components/Icon90Lightbulb2.vue'
import Icon90Lightbulb from './components/Icon90Lightbulb.vue'
import Icon90Lightning2 from './components/Icon90Lightning2.vue'
import Icon90Lightning3 from './components/Icon90Lightning3.vue'
import Icon90Lightning from './components/Icon90Lightning.vue'
import Icon90Linechart from './components/Icon90Linechart.vue'
import Icon90List from './components/Icon90List.vue'
import Icon90Live2 from './components/Icon90Live2.vue'
import Icon90Live from './components/Icon90Live.vue'
import Icon90Location2 from './components/Icon90Location2.vue'
import Icon90Location from './components/Icon90Location.vue'
import Icon90Lock2 from './components/Icon90Lock2.vue'
import Icon90Lock from './components/Icon90Lock.vue'
import Icon90Lose from './components/Icon90Lose.vue'
import Icon90Mail2 from './components/Icon90Mail2.vue'
import Icon90Mail from './components/Icon90Mail.vue'
import Icon90Male from './components/Icon90Male.vue'
import Icon90Mark from './components/Icon90Mark.vue'
import Icon90Medical from './components/Icon90Medical.vue'
import Icon90Mic2 from './components/Icon90Mic2.vue'
import Icon90Mic from './components/Icon90Mic.vue'
import Icon90Micmute from './components/Icon90Micmute.vue'
import Icon90Mine4 from './components/Icon90Mine4.vue'
import Icon90Mine5 from './components/Icon90Mine5.vue'
import Icon90Minimize from './components/Icon90Minimize.vue'
import Icon90Minus from './components/Icon90Minus.vue'
import Icon90Mobilephone from './components/Icon90Mobilephone.vue'
import Icon90Module from './components/Icon90Module.vue'
import Icon90Molecule from './components/Icon90Molecule.vue'
import Icon90Money from './components/Icon90Money.vue'
import Icon90Moneybag from './components/Icon90Moneybag.vue'
import Icon90Monitor from './components/Icon90Monitor.vue'
import Icon90Monument2 from './components/Icon90Monument2.vue'
import Icon90Monument from './components/Icon90Monument.vue'
import Icon90More1 from './components/Icon90More1.vue'
import Icon90More2 from './components/Icon90More2.vue'
import Icon90More3 from './components/Icon90More3.vue'
import Icon90More from './components/Icon90More.vue'
import Icon90Museum from './components/Icon90Museum.vue'
import Icon90Mute from './components/Icon90Mute.vue'
import Icon90NoNotice from './components/Icon90NoNotice.vue'
import Icon90Note2 from './components/Icon90Note2.vue'
import Icon90Note from './components/Icon90Note.vue'
import Icon90Notice from './components/Icon90Notice.vue'
import Icon90Order from './components/Icon90Order.vue'
import Icon90Paper from './components/Icon90Paper.vue'
import Icon90Paperplane2 from './components/Icon90Paperplane2.vue'
import Icon90Paperplane from './components/Icon90Paperplane.vue'
import Icon90PetrolPump from './components/Icon90PetrolPump.vue'
import Icon90Pharmacy2 from './components/Icon90Pharmacy2.vue'
import Icon90Pharmacy3 from './components/Icon90Pharmacy3.vue'
import Icon90Pharmacy from './components/Icon90Pharmacy.vue'
import Icon90Phone2 from './components/Icon90Phone2.vue'
import Icon90Phone from './components/Icon90Phone.vue'
import Icon90Picture from './components/Icon90Picture.vue'
import Icon90PieChart from './components/Icon90PieChart.vue'
import Icon90Plane2 from './components/Icon90Plane2.vue'
import Icon90Plane from './components/Icon90Plane.vue'
import Icon90Play from './components/Icon90Play.vue'
import Icon90PointLine from './components/Icon90PointLine.vue'
import Icon90Print from './components/Icon90Print.vue'
import Icon90Quantity from './components/Icon90Quantity.vue'
import Icon90Question from './components/Icon90Question.vue'
import Icon90Radio from './components/Icon90Radio.vue'
import Icon90Reboot from './components/Icon90Reboot.vue'
import Icon90Recharge from './components/Icon90Recharge.vue'
import Icon90Record2 from './components/Icon90Record2.vue'
import Icon90Record from './components/Icon90Record.vue'
import Icon90Reduce from './components/Icon90Reduce.vue'
import Icon90Refresh2 from './components/Icon90Refresh2.vue'
import Icon90Refresh from './components/Icon90Refresh.vue'
import Icon90Repair from './components/Icon90Repair.vue'
import Icon90Repost2 from './components/Icon90Repost2.vue'
import Icon90Repost from './components/Icon90Repost.vue'
import Icon90Right2 from './components/Icon90Right2.vue'
import Icon90Right3 from './components/Icon90Right3.vue'
import Icon90Right4 from './components/Icon90Right4.vue'
import Icon90Right5 from './components/Icon90Right5.vue'
import Icon90Right from './components/Icon90Right.vue'
import Icon90Road from './components/Icon90Road.vue'
import Icon90RulerMeasure from './components/Icon90RulerMeasure.vue'
import Icon90Safety2 from './components/Icon90Safety2.vue'
import Icon90Safety3 from './components/Icon90Safety3.vue'
import Icon90Safety4 from './components/Icon90Safety4.vue'
import Icon90Safety from './components/Icon90Safety.vue'
import Icon90Save2 from './components/Icon90Save2.vue'
import Icon90Save3 from './components/Icon90Save3.vue'
import Icon90Save from './components/Icon90Save.vue'
import Icon90ScanPay from './components/Icon90ScanPay.vue'
import Icon90School from './components/Icon90School.vue'
import Icon90Scissors from './components/Icon90Scissors.vue'
import Icon90Search from './components/Icon90Search.vue'
import Icon90Service2 from './components/Icon90Service2.vue'
import Icon90Service3 from './components/Icon90Service3.vue'
import Icon90Service4 from './components/Icon90Service4.vue'
import Icon90Service from './components/Icon90Service.vue'
import Icon90Setting from './components/Icon90Setting.vue'
import Icon90Settings from './components/Icon90Settings.vue'
import Icon90Share from './components/Icon90Share.vue'
import Icon90Signal from './components/Icon90Signal.vue'
import Icon90Sitemap from './components/Icon90Sitemap.vue'
import Icon90Sound from './components/Icon90Sound.vue'
import Icon90Stack from './components/Icon90Stack.vue'
import Icon90Star from './components/Icon90Star.vue'
import Icon90Staroff from './components/Icon90Staroff.vue'
import Icon90StatsAlt2 from './components/Icon90StatsAlt2.vue'
import Icon90StatsAlt from './components/Icon90StatsAlt.vue'
import Icon90Stethoscope from './components/Icon90Stethoscope.vue'
import Icon90Student from './components/Icon90Student.vue'
import Icon90Subscribe from './components/Icon90Subscribe.vue'
import Icon90Table from './components/Icon90Table.vue'
import Icon90Tag from './components/Icon90Tag.vue'
import Icon90Tapy from './components/Icon90Tapy.vue'
import Icon90Target from './components/Icon90Target.vue'
import Icon90Team2 from './components/Icon90Team2.vue'
import Icon90Team3 from './components/Icon90Team3.vue'
import Icon90Team4 from './components/Icon90Team4.vue'
import Icon90Team from './components/Icon90Team.vue'
import Icon90Temperature from './components/Icon90Temperature.vue'
import Icon90ThumbsUp2 from './components/Icon90ThumbsUp2.vue'
import Icon90ThumbsUp from './components/Icon90ThumbsUp.vue'
import Icon90Ticket2 from './components/Icon90Ticket2.vue'
import Icon90Ticket from './components/Icon90Ticket.vue'
import Icon90Time2 from './components/Icon90Time2.vue'
import Icon90Time from './components/Icon90Time.vue'
import Icon90Tip2 from './components/Icon90Tip2.vue'
import Icon90Tip from './components/Icon90Tip.vue'
import Icon90Top from './components/Icon90Top.vue'
import Icon90Topic from './components/Icon90Topic.vue'
import Icon90Trending from './components/Icon90Trending.vue'
import Icon90Trophy2 from './components/Icon90Trophy2.vue'
import Icon90Trophy3 from './components/Icon90Trophy3.vue'
import Icon90Trophy4 from './components/Icon90Trophy4.vue'
import Icon90Trophy from './components/Icon90Trophy.vue'
import Icon90Unlike from './components/Icon90Unlike.vue'
import Icon90Up2 from './components/Icon90Up2.vue'
import Icon90Up3 from './components/Icon90Up3.vue'
import Icon90Up4 from './components/Icon90Up4.vue'
import Icon90Up5 from './components/Icon90Up5.vue'
import Icon90Up from './components/Icon90Up.vue'
import Icon90Upload2 from './components/Icon90Upload2.vue'
import Icon90Upload from './components/Icon90Upload.vue'
import Icon90Usb from './components/Icon90Usb.vue'
import Icon90User2 from './components/Icon90User2.vue'
import Icon90User3 from './components/Icon90User3.vue'
import Icon90User4 from './components/Icon90User4.vue'
import Icon90User5 from './components/Icon90User5.vue'
import Icon90User6 from './components/Icon90User6.vue'
import Icon90User7 from './components/Icon90User7.vue'
import Icon90User8 from './components/Icon90User8.vue'
import Icon90UserAdd from './components/Icon90UserAdd.vue'
import Icon90User from './components/Icon90User.vue'
import Icon90Video from './components/Icon90Video.vue'
import Icon90View2 from './components/Icon90View2.vue'
import Icon90View from './components/Icon90View.vue'
import Icon90Viewoff from './components/Icon90Viewoff.vue'
import Icon90Vip2 from './components/Icon90Vip2.vue'
import Icon90Vip from './components/Icon90Vip.vue'
import Icon90Warn2 from './components/Icon90Warn2.vue'
import Icon90Warn from './components/Icon90Warn.vue'
import Icon90WaterTicket from './components/Icon90WaterTicket.vue'
import Icon90Water from './components/Icon90Water.vue'
import Icon90Webcam2 from './components/Icon90Webcam2.vue'
import Icon90Webcam from './components/Icon90Webcam.vue'
import Icon90Wechat from './components/Icon90Wechat.vue'
import Icon90Wifi from './components/Icon90Wifi.vue'
import Icon90WxMiniProgram from './components/Icon90WxMiniProgram.vue'
import Icon90Zoomin from './components/Icon90Zoomin.vue'
import Icon90Zoomout from './components/Icon90Zoomout.vue'
import IconCustom1stCert from './components/IconCustom1stCert.vue'
import IconCustom2ndCert from './components/IconCustom2ndCert.vue'
import IconCustomAggregation2 from './components/IconCustomAggregation2.vue'
import IconCustomAggregation from './components/IconCustomAggregation.vue'
import IconCustomAmmonite2 from './components/IconCustomAmmonite2.vue'
import IconCustomAmmonite from './components/IconCustomAmmonite.vue'
import IconCustomAnimal from './components/IconCustomAnimal.vue'
import IconCustomAnnouncement from './components/IconCustomAnnouncement.vue'
import IconCustomArticle2 from './components/IconCustomArticle2.vue'
import IconCustomArticle from './components/IconCustomArticle.vue'
import IconCustomBack2 from './components/IconCustomBack2.vue'
import IconCustomBack3 from './components/IconCustomBack3.vue'
import IconCustomBack4 from './components/IconCustomBack4.vue'
import IconCustomBack from './components/IconCustomBack.vue'
import IconCustomBadge from './components/IconCustomBadge.vue'
import IconCustomBell from './components/IconCustomBell.vue'
import IconCustomBox from './components/IconCustomBox.vue'
import IconCustomBriefcase from './components/IconCustomBriefcase.vue'
import IconCustomBuilding2 from './components/IconCustomBuilding2.vue'
import IconCustomBuilding from './components/IconCustomBuilding.vue'
import IconCustomCalendar from './components/IconCustomCalendar.vue'
import IconCustomCart2stars from './components/IconCustomCart2stars.vue'
import IconCustomCart3stars from './components/IconCustomCart3stars.vue'
import IconCustomCert from './components/IconCustomCert.vue'
import IconCustomChange2 from './components/IconCustomChange2.vue'
import IconCustomChange from './components/IconCustomChange.vue'
import IconCustomChat from './components/IconCustomChat.vue'
import IconCustomContrast from './components/IconCustomContrast.vue'
import IconCustomData from './components/IconCustomData.vue'
import IconCustomDelete2 from './components/IconCustomDelete2.vue'
import IconCustomDelete from './components/IconCustomDelete.vue'
import IconCustomDetails from './components/IconCustomDetails.vue'
import IconCustomDownArrow from './components/IconCustomDownArrow.vue'
import IconCustomDrawers2 from './components/IconCustomDrawers2.vue'
import IconCustomDrawers from './components/IconCustomDrawers.vue'
import IconCustomEdit from './components/IconCustomEdit.vue'
import IconCustomExamine from './components/IconCustomExamine.vue'
import IconCustomFailed from './components/IconCustomFailed.vue'
import IconCustomFileFailed from './components/IconCustomFileFailed.vue'
import IconCustomFileForward from './components/IconCustomFileForward.vue'
import IconCustomFileFound from './components/IconCustomFileFound.vue'
import IconCustomFileSuccess2 from './components/IconCustomFileSuccess2.vue'
import IconCustomFileSuccess from './components/IconCustomFileSuccess.vue'
import IconCustomFileUpload2 from './components/IconCustomFileUpload2.vue'
import IconCustomFileUpload from './components/IconCustomFileUpload.vue'
import IconCustomFileWaiting from './components/IconCustomFileWaiting.vue'
import IconCustomFile from './components/IconCustomFile.vue'
import IconCustomFiles from './components/IconCustomFiles.vue'
import IconCustomFillExamine from './components/IconCustomFillExamine.vue'
import IconCustomFolderOpen from './components/IconCustomFolderOpen.vue'
import IconCustomFolder from './components/IconCustomFolder.vue'
import IconCustomGuide from './components/IconCustomGuide.vue'
import IconCustomHome from './components/IconCustomHome.vue'
import IconCustomLand from './components/IconCustomLand.vue'
import IconCustomLayers2 from './components/IconCustomLayers2.vue'
import IconCustomLayers from './components/IconCustomLayers.vue'
import IconCustomLeaf2 from './components/IconCustomLeaf2.vue'
import IconCustomLeaf from './components/IconCustomLeaf.vue'
import IconCustomLedger from './components/IconCustomLedger.vue'
import IconCustomLifted from './components/IconCustomLifted.vue'
import IconCustomLockOpen from './components/IconCustomLockOpen.vue'
import IconCustomLock from './components/IconCustomLock.vue'
import IconCustomMark from './components/IconCustomMark.vue'
import IconCustomMolecule from './components/IconCustomMolecule.vue'
import IconCustomMoney from './components/IconCustomMoney.vue'
import IconCustomMonitor2 from './components/IconCustomMonitor2.vue'
import IconCustomMonitor from './components/IconCustomMonitor.vue'
import IconCustomMonumentManage from './components/IconCustomMonumentManage.vue'
import IconCustomMountain2 from './components/IconCustomMountain2.vue'
import IconCustomMountain3 from './components/IconCustomMountain3.vue'
import IconCustomMountain from './components/IconCustomMountain.vue'
import IconCustomNoPinpoint from './components/IconCustomNoPinpoint.vue'
import IconCustomNote2 from './components/IconCustomNote2.vue'
import IconCustomNote from './components/IconCustomNote.vue'
import IconCustomOverlap from './components/IconCustomOverlap.vue'
import IconCustomPatrol from './components/IconCustomPatrol.vue'
import IconCustomPic2 from './components/IconCustomPic2.vue'
import IconCustomPic from './components/IconCustomPic.vue'
import IconCustomPinpointFill2 from './components/IconCustomPinpointFill2.vue'
import IconCustomPinpointFill from './components/IconCustomPinpointFill.vue'
import IconCustomPinpoint from './components/IconCustomPinpoint.vue'
import IconCustomPlantation from './components/IconCustomPlantation.vue'
import IconCustomPlay from './components/IconCustomPlay.vue'
import IconCustomProject from './components/IconCustomProject.vue'
import IconCustomQuantity from './components/IconCustomQuantity.vue'
import IconCustomQuestion from './components/IconCustomQuestion.vue'
import IconCustomRandom from './components/IconCustomRandom.vue'
import IconCustomSaveNature from './components/IconCustomSaveNature.vue'
import IconCustomSave from './components/IconCustomSave.vue'
import IconCustomSetting from './components/IconCustomSetting.vue'
import IconCustomSignManage from './components/IconCustomSignManage.vue'
import IconCustomSignature from './components/IconCustomSignature.vue'
import IconCustomSuccess from './components/IconCustomSuccess.vue'
import IconCustomSwitch from './components/IconCustomSwitch.vue'
import IconCustomTag from './components/IconCustomTag.vue'
import IconCustomTask from './components/IconCustomTask.vue'
import IconCustomTeam from './components/IconCustomTeam.vue'
import IconCustomTicket from './components/IconCustomTicket.vue'
import IconCustomTips2 from './components/IconCustomTips2.vue'
import IconCustomTips from './components/IconCustomTips.vue'
import IconCustomTree2 from './components/IconCustomTree2.vue'
import IconCustomTree3 from './components/IconCustomTree3.vue'
import IconCustomTree4 from './components/IconCustomTree4.vue'
import IconCustomTree from './components/IconCustomTree.vue'
import IconCustomTriangleDown from './components/IconCustomTriangleDown.vue'
import IconCustomTriangleLeft from './components/IconCustomTriangleLeft.vue'
import IconCustomTriangleRight from './components/IconCustomTriangleRight.vue'
import IconCustomTriangleUp from './components/IconCustomTriangleUp.vue'
import IconCustomUpArrow from './components/IconCustomUpArrow.vue'
import IconCustomUpload from './components/IconCustomUpload.vue'
import IconCustomUserAdd from './components/IconCustomUserAdd.vue'
import IconCustomUserForward from './components/IconCustomUserForward.vue'
import IconCustomUserRound from './components/IconCustomUserRound.vue'
import IconCustomUserSuccess from './components/IconCustomUserSuccess.vue'
import IconCustomUserWaiting from './components/IconCustomUserWaiting.vue'
import IconCustomUser from './components/IconCustomUser.vue'
import IconCustomWaiting2 from './components/IconCustomWaiting2.vue'
import IconCustomWaiting from './components/IconCustomWaiting.vue'
import IconCustomYunnan from './components/IconCustomYunnan.vue'

const components = {
  IconBase,
  HdiIcon,
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

function install(app: App) {
  for (const [name, comp] of Object.entries(components)) {
    app.component(name, comp as never)
    // HTML CDN 场景下浏览器用 kebab-case 标签名，需注册 kebab-case 别名
    app.component(toKebabName(name), comp as never)
  }
}

export { install, IconBase, HdiIcon, Icon60Add, Icon60AreaChart, Icon60Area, Icon60Article, Icon60Back2, Icon60Back, Icon60Bell, Icon60Clear, Icon60Corsshair2, Icon60Corsshair, Icon60Delete, Icon60Download2, Icon60Download, Icon60DrawShape, Icon60Edit2, Icon60Edit, Icon60Exit2, Icon60Exit, Icon60Export, Icon60Failed, Icon60FileMarked, Icon60FolderAdd, Icon60Fullscreen2, Icon60Fullscreen, Icon60Function, Icon60Hand, Icon60Import2, Icon60Import, Icon60Layers, Icon60Left, Icon60Linechart, Icon60Location, Icon60Lock, Icon60Minimize2, Icon60Minimize, Icon60PieChart, Icon60Right, Icon60RulerMeasure, Icon60Safety2, Icon60Safety, Icon60ScreenChange, Icon60Search, Icon60Settings2, Icon60Settings, Icon60StatsAlt, Icon60Success, Icon60Tips2, Icon60Tips3, Icon60Tips, Icon60Upload, Icon60User, Icon60Volume, Icon60Warning, Icon60ZoomIn, Icon60ZoomOut, Icon80Add, Icon80AreaChart, Icon80Area, Icon80Article, Icon80Back, Icon80Bell, Icon80Clear, Icon80Corsshair, Icon80Delete, Icon80Down, Icon80Download2, Icon80DrawShape, Icon80Edit, Icon80Exit2, Icon80Exit, Icon80Export, Icon80Failed, Icon80FileMarked, Icon80FolderAdd, Icon80Fullscreen2, Icon80Fullscreen, Icon80Function, Icon80Hand, Icon80Height, Icon80Import2, Icon80Import, Icon80Layers, Icon80Left, Icon80Linechart, Icon80Location, Icon80Lock, Icon80Minimize2, Icon80Minimize, Icon80PieChart, Icon80Refresh, Icon80Right, Icon80RulerMeasure, Icon80Safety2, Icon80Safety, Icon80Search, Icon80Settings2, Icon80Settings, Icon80StatsAlt, Icon80Success, Icon80Tips2, Icon80Tips3, Icon80Tips, Icon80Up, Icon80Upload, Icon80User, Icon80Volume, Icon80ZoomIn, Icon80ZoomOut, Icon90Add2, Icon90Add, Icon90Alarmclock2, Icon90Alarmclock3, Icon90Alarmclock, Icon90Alerts, Icon90Animal, Icon90ArrowsCross, Icon90Article2, Icon90Article, Icon90Attach, Icon90Badge, Icon90Bell2, Icon90Bell, Icon90Bigdown, Icon90Bigup, Icon90Bike, Icon90Bill, Icon90Bluetooth, Icon90Board, Icon90BookMark, Icon90Book, Icon90Bottle, Icon90Box2, Icon90Box3, Icon90Box, Icon90Briefcase, Icon90Browser, Icon90Building2, Icon90Building3, Icon90Building4, Icon90Building5, Icon90Building6, Icon90Building7, Icon90Building, Icon90Bus, Icon90Calculator2, Icon90Calculator3, Icon90Calculator4, Icon90Calculator, Icon90Calendar, Icon90Camera2, Icon90Camera, Icon90Car2, Icon90Car, Icon90CardLayout, Icon90Card, Icon90Cd, Icon90Change2, Icon90Change3, Icon90ChangeLanguages, Icon90Change, Icon90Charity, Icon90Chat, Icon90Check, Icon90Checked2, Icon90Checked, Icon90Checkin, Icon90Child, Icon90Chip, Icon90City2, Icon90City, Icon90Classify2, Icon90Classify3, Icon90Classify4, Icon90Classify, Icon90Clear, Icon90Close, Icon90Cloud, Icon90Code2, Icon90Code3, Icon90Code4, Icon90Code, Icon90Coins, Icon90Comment, Icon90Connection, Icon90Consume, Icon90Correct2, Icon90Correct, Icon90Corsshair, Icon90Cover, Icon90Crop, Icon90Cupboard, Icon90Dashboard, Icon90Database, Icon90Date2, Icon90Date3, Icon90Date, Icon90Delete2, Icon90Delete, Icon90Device, Icon90Diamond, Icon90Dining2, Icon90Dining, Icon90Discover, Icon90Down2, Icon90Down3, Icon90Down4, Icon90Down5, Icon90Down, Icon90Download2, Icon90Download3, Icon90Download, Icon90DrawShape, Icon90Drug, Icon90Earth, Icon90Edit2, Icon90Edit3, Icon90Edit4, Icon90Edit, Icon90Elevator, Icon90Examine2, Icon90Examine3, Icon90Examine, Icon90Exit2, Icon90Exit, Icon90Expand, Icon90Expenses, Icon90Export, Icon90Factory, Icon90Failed, Icon90Female, Icon90File2, Icon90File3, Icon90File4, Icon90File5, Icon90FileAdd, Icon90FileReduce, Icon90File, Icon90Finish2, Icon90Finish, Icon90Fire, Icon90Flag2, Icon90Flag3, Icon90Flag, Icon90Flashlight, Icon90FolderAdd, Icon90FolderReduce, Icon90Folder, Icon90Folderopen, Icon90Forbid, Icon90Fullscreen, Icon90Function, Icon90Funnel, Icon90Game, Icon90GestureUp, Icon90Gift, Icon90Handwashing, Icon90Healthy, Icon90Help, Icon90Home2, Icon90Home3, Icon90Home4, Icon90Home5, Icon90Home, Icon90Hospital, Icon90Hotel, Icon90Hourglass2, Icon90Hourglass3, Icon90Hourglass, Icon90IdCard, Icon90Import, Icon90Income, Icon90Inquire, Icon90Invisible, Icon90Invoice, Icon90Key, Icon90Law, Icon90Leaf2, Icon90Leaf, Icon90Left2, Icon90Left3, Icon90Left4, Icon90Left5, Icon90Left, Icon90Lightbulb2, Icon90Lightbulb, Icon90Lightning2, Icon90Lightning3, Icon90Lightning, Icon90Linechart, Icon90List, Icon90Live2, Icon90Live, Icon90Location2, Icon90Location, Icon90Lock2, Icon90Lock, Icon90Lose, Icon90Mail2, Icon90Mail, Icon90Male, Icon90Mark, Icon90Medical, Icon90Mic2, Icon90Mic, Icon90Micmute, Icon90Mine4, Icon90Mine5, Icon90Minimize, Icon90Minus, Icon90Mobilephone, Icon90Module, Icon90Molecule, Icon90Money, Icon90Moneybag, Icon90Monitor, Icon90Monument2, Icon90Monument, Icon90More1, Icon90More2, Icon90More3, Icon90More, Icon90Museum, Icon90Mute, Icon90NoNotice, Icon90Note2, Icon90Note, Icon90Notice, Icon90Order, Icon90Paper, Icon90Paperplane2, Icon90Paperplane, Icon90PetrolPump, Icon90Pharmacy2, Icon90Pharmacy3, Icon90Pharmacy, Icon90Phone2, Icon90Phone, Icon90Picture, Icon90PieChart, Icon90Plane2, Icon90Plane, Icon90Play, Icon90PointLine, Icon90Print, Icon90Quantity, Icon90Question, Icon90Radio, Icon90Reboot, Icon90Recharge, Icon90Record2, Icon90Record, Icon90Reduce, Icon90Refresh2, Icon90Refresh, Icon90Repair, Icon90Repost2, Icon90Repost, Icon90Right2, Icon90Right3, Icon90Right4, Icon90Right5, Icon90Right, Icon90Road, Icon90RulerMeasure, Icon90Safety2, Icon90Safety3, Icon90Safety4, Icon90Safety, Icon90Save2, Icon90Save3, Icon90Save, Icon90ScanPay, Icon90School, Icon90Scissors, Icon90Search, Icon90Service2, Icon90Service3, Icon90Service4, Icon90Service, Icon90Setting, Icon90Settings, Icon90Share, Icon90Signal, Icon90Sitemap, Icon90Sound, Icon90Stack, Icon90Star, Icon90Staroff, Icon90StatsAlt2, Icon90StatsAlt, Icon90Stethoscope, Icon90Student, Icon90Subscribe, Icon90Table, Icon90Tag, Icon90Tapy, Icon90Target, Icon90Team2, Icon90Team3, Icon90Team4, Icon90Team, Icon90Temperature, Icon90ThumbsUp2, Icon90ThumbsUp, Icon90Ticket2, Icon90Ticket, Icon90Time2, Icon90Time, Icon90Tip2, Icon90Tip, Icon90Top, Icon90Topic, Icon90Trending, Icon90Trophy2, Icon90Trophy3, Icon90Trophy4, Icon90Trophy, Icon90Unlike, Icon90Up2, Icon90Up3, Icon90Up4, Icon90Up5, Icon90Up, Icon90Upload2, Icon90Upload, Icon90Usb, Icon90User2, Icon90User3, Icon90User4, Icon90User5, Icon90User6, Icon90User7, Icon90User8, Icon90UserAdd, Icon90User, Icon90Video, Icon90View2, Icon90View, Icon90Viewoff, Icon90Vip2, Icon90Vip, Icon90Warn2, Icon90Warn, Icon90WaterTicket, Icon90Water, Icon90Webcam2, Icon90Webcam, Icon90Wechat, Icon90Wifi, Icon90WxMiniProgram, Icon90Zoomin, Icon90Zoomout, IconCustom1stCert, IconCustom2ndCert, IconCustomAggregation2, IconCustomAggregation, IconCustomAmmonite2, IconCustomAmmonite, IconCustomAnimal, IconCustomAnnouncement, IconCustomArticle2, IconCustomArticle, IconCustomBack2, IconCustomBack3, IconCustomBack4, IconCustomBack, IconCustomBadge, IconCustomBell, IconCustomBox, IconCustomBriefcase, IconCustomBuilding2, IconCustomBuilding, IconCustomCalendar, IconCustomCart2stars, IconCustomCart3stars, IconCustomCert, IconCustomChange2, IconCustomChange, IconCustomChat, IconCustomContrast, IconCustomData, IconCustomDelete2, IconCustomDelete, IconCustomDetails, IconCustomDownArrow, IconCustomDrawers2, IconCustomDrawers, IconCustomEdit, IconCustomExamine, IconCustomFailed, IconCustomFileFailed, IconCustomFileForward, IconCustomFileFound, IconCustomFileSuccess2, IconCustomFileSuccess, IconCustomFileUpload2, IconCustomFileUpload, IconCustomFileWaiting, IconCustomFile, IconCustomFiles, IconCustomFillExamine, IconCustomFolderOpen, IconCustomFolder, IconCustomGuide, IconCustomHome, IconCustomLand, IconCustomLayers2, IconCustomLayers, IconCustomLeaf2, IconCustomLeaf, IconCustomLedger, IconCustomLifted, IconCustomLockOpen, IconCustomLock, IconCustomMark, IconCustomMolecule, IconCustomMoney, IconCustomMonitor2, IconCustomMonitor, IconCustomMonumentManage, IconCustomMountain2, IconCustomMountain3, IconCustomMountain, IconCustomNoPinpoint, IconCustomNote2, IconCustomNote, IconCustomOverlap, IconCustomPatrol, IconCustomPic2, IconCustomPic, IconCustomPinpointFill2, IconCustomPinpointFill, IconCustomPinpoint, IconCustomPlantation, IconCustomPlay, IconCustomProject, IconCustomQuantity, IconCustomQuestion, IconCustomRandom, IconCustomSaveNature, IconCustomSave, IconCustomSetting, IconCustomSignManage, IconCustomSignature, IconCustomSuccess, IconCustomSwitch, IconCustomTag, IconCustomTask, IconCustomTeam, IconCustomTicket, IconCustomTips2, IconCustomTips, IconCustomTree2, IconCustomTree3, IconCustomTree4, IconCustomTree, IconCustomTriangleDown, IconCustomTriangleLeft, IconCustomTriangleRight, IconCustomTriangleUp, IconCustomUpArrow, IconCustomUpload, IconCustomUserAdd, IconCustomUserForward, IconCustomUserRound, IconCustomUserSuccess, IconCustomUserWaiting, IconCustomUser, IconCustomWaiting2, IconCustomWaiting, IconCustomYunnan }
export type { IconProps } from '../components/Icon/types'
