import { CategoryController } from "./controller/CategoryController";
import { CustomerController } from "./controller/CustomerController";
import { QuestionController } from "./controller/QuestionController";
import { RequestController } from "./controller/RequestController";
import { ServiceProviderController } from "./controller/ServiceProviderController";
import { SubCategoryController } from "./controller/SubCategoryController";
import { UserController } from "./controller/UserController";

export const Routes = [
    { method: "get", route: "/users", controller: UserController, action: "all" }, 
    { method: "get", route: "/users/:id", controller: UserController, action: "one" }, 
    { method: "post", route: "/users", controller: UserController, action: "save" }, 
    { method: "post", route: "/users/create", controller: UserController, action: "createUser" }, 
    { method: "post", route: "/users/auth", controller: UserController, action: "auth" },  
    { method: "delete", route: "/users/:id", controller: UserController, action: "remove" },
    
    { method: "get", route: "/category", controller: CategoryController, action: "all" }, 
    { method: "get", route: "/category/:id", controller: CategoryController, action: "one" }, 
    { method: "post", route: "/category", controller: CategoryController, action: "save" }, 
    { method: "delete", route: "/category/:id", controller: CategoryController, action: "remove" }, 

    { method: "get", route: "/subcategory", controller: SubCategoryController, action: "all" }, 
    { method: "get", route: "/subcategory/:id", controller: SubCategoryController, action: "one" }, 
    { method: "post", route: "/subcategory", controller: SubCategoryController, action: "save" }, 
    { method: "delete", route: "/subcategory/:id", controller: SubCategoryController, action: "remove" },

    { method: "get", route: "/question", controller: QuestionController, action: "all" }, 
    { method: "get", route: "/question/:id", controller: QuestionController, action: "one" }, 
    { method: "post", route: "/question", controller: QuestionController, action: "save" }, 
    { method: "delete", route: "/question/:id", controller: QuestionController, action: "remove" }, 

    { method: "get", route: "/customer", controller: CustomerController, action: "all" }, 
    { method: "get", route: "/customer/:id", controller: CustomerController, action: "one" }, 
    { method: "post", route: "/customer", controller: CustomerController, action: "save" }, 
    { method: "post", route: "/customer/create", controller: CustomerController, action: "createCustomer" }, 
    { method: "delete", route: "/customer/:id", controller: CustomerController, action: "remove" }, 

    { method: "get", route: "/serviceProvider", controller: ServiceProviderController, action: "all" }, 
    { method: "get", route: "/serviceProvider/:id", controller: ServiceProviderController, action: "one" }, 
    { method: "post", route: "/serviceProvider", controller: ServiceProviderController, action: "save" }, 
    { method: "post", route: "/serviceProvider/create", controller: ServiceProviderController, action: "createServiceProvider" }, 
    { method: "delete", route: "/serviceProvider/:id", controller: ServiceProviderController, action: "remove" }, 

    { method: "get", route: "/request", controller: RequestController, action: "all" }, 
    { method: "get", route: "/request/:id", controller: RequestController, action: "one" }, 
    { method: "post", route: "/request", controller: RequestController, action: "save" },
    { method: "delete", route: "/request/:id", controller: RequestController, action: "remove" }, 
];