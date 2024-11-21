// Role model (if needed)
export class Role {
    id!: number;
    name!: string;
    // Add other Role properties as needed
  }
  
  // UserModel class extending BaseModel
  export class UserModel {
    public id!: number;
    public userName: string = '';
    public password: string = '';
    public roleId!: number;
    public role?: Role; // Optional property
    public requestId!: number;
  }