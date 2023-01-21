import { GraphQLSchema,GraphQLObjectType} from "graphql";
import { GREETING } from "./Querys/greeting";

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        greeting:GREETING
    }
})

export const Schema = new GraphQLSchema({
    query:RootQuery,
})