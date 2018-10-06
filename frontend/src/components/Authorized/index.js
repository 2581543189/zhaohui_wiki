import Authorized from './Authorized';//Authorized 本身是一个组件  return 的是props 中的target
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.Secured = Secured;//@Secured 这他妈是个注解....
Authorized.AuthorizedRoute = AuthorizedRoute;//暂时没看明白.
Authorized.check = check;//check BaseMenu 使用了这个方法

export default renderAuthorize(Authorized);//方法在这个地方执行了
