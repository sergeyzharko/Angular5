Task1:

Дополнительная функциональность:

1. Замена favicon ).
2. Добавлены стили в style.css.
3. Добавлены поля воода адреса доставки с двунаправленным связыванием в карту покупок. Адрес отображается внизу страницы при всех заполненных полях.
4. Добавлена возможность удаления товаров из корзины.
5. Описание товара открывается / закрывается по клику на название.



Task2:

Дополнительная функциональность:

1. В product-list применён [ngClass] и [ngStyle]
2. #variable в cart.component.html: сначала вводим адрес, затем нажимаем buy
3. @ViewChild в cart.component.ts: кнопка Clear
4. ngOnChanges в product.component.ts
5. ngOnDestroy в cart-item.component.ts
6. События keyup.enter и blur в hello.component.ts



Task4:

1. В компоненте product применены currency, date и uppercase пайпы.
2. В компоненте order применён currency пайп.



Task5:

1. Корзина реализована в виде Secondary Router Outlet
2. В модуле Admin применён Child Route Configuration
3. Внедрена относительная навигация
4. Модули Products и Admin вынесены в асинхронную загрузку
5. В модуле Admin, компоненте ProductComponent и ProductListComponent используются CanActivate, CanActivateChild, CanLoad, CanDeactivate, Resolve
6. В app.routing ализованы Custom Preloading Strategy, Title Service
7. localstorage реализован в корзине (модуль cart)



Task6:

1. Сервис по схеме Promise: ProductsService; по схеме Observable: UserArrayService, OrderArrayService.
2. Добавлена функциональность регистрации и авторизации нового пользователя. При оформлении заказа происходит его регистрация.
   В дальнейшем статус заказа можно изменить в панеле адимнистратора.
3. Добавлена функциональность корзины. При добавлении нового продукта появляется кнопка открытия корзины. При нажатии оформления заказа
   запрашивается вход (перенаправления на страницу login) или регистрация (register). Затем заказ добавляется в список заказов.
4. В качестве бэкэнда используется json-server: json-server --watch db/db.json
5. Добавлен ServerAddressInterceptor, который подставляет всем http запросам адрес сервера, прописанного в ConstantsService.
6. Добавлены AutoUnsubscribe декоратор.



Task7:

1. Чтобы войти в панель администратора, нужно авторизовать с логином/паролем Admin/Admin
2. Добавлена опция "Remember me" на странице авторизации. Реализовано через LocalStorage.
3. В форме продукта добавлена проверка существования имени, а в форме пользователя - логина через Async Custom Validator Directive.
4. Добавлен шаблон ввода телефонного номера при его выборе в Send Notifications.
5. Переработаны страницы "News" и "About".