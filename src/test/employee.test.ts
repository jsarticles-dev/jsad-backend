import bcrypt from "bcrypt";
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from "@jest/globals";
import { EMPLOYEE_ROLES } from "../constants/generalConstants";
import {
  EmployeeModel,
  addNewEmoloyee,
  deleteEmployeeById,
  findEmployeeByEmail,
  findEmployeeById,
  findEmployees,
  updateEmployeeById,
} from "../model/employee";
import {
  connectDB,
  dropCollections,
  dropDB,
} from "../configs/mongoMemoryServer";

describe("Employee Model", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  afterEach(async () => {
    await dropCollections();
  });

  it("should add new employee", async () => {
    const hashedPassword = await bcrypt.hash("test", 10);

    const VALID_EMPLOYEE = {
      name: "Employee Name",
      password: hashedPassword,
      role: EMPLOYEE_ROLES.ADMIN,
      email: "test@yopmail.com",
    };

    const createdEmployee = await addNewEmoloyee(VALID_EMPLOYEE);

    expect(createdEmployee).toBeDefined();
    expect(createdEmployee.name).toEqual(VALID_EMPLOYEE.name);
    expect(createdEmployee.password).toEqual(VALID_EMPLOYEE.password);
    expect(createdEmployee.role).toEqual(VALID_EMPLOYEE.role);
    expect(createdEmployee.email).toEqual(VALID_EMPLOYEE.email);
  });

  it("should find employee by id", async () => {
    const hashedPassword = await bcrypt.hash("test", 10);

    const VALID_EMPLOYEE = {
      name: "Employee Name",
      password: hashedPassword,
      role: EMPLOYEE_ROLES.ADMIN,
      email: "test@yopmail.com",
    };

    const createdEmployee = await addNewEmoloyee(VALID_EMPLOYEE);
    const employee = await findEmployeeById(createdEmployee?._id?.toString());

    expect(createdEmployee).toBeDefined();
    expect(employee).toBeDefined();

    expect(createdEmployee.email).toEqual(employee?.email);
  });

  it("should find all employees", async () => {
    const VALID_EMPLOYEES = [
      {
        name: "Employee Name1",
        password: "testpass",
        role: EMPLOYEE_ROLES.ADMIN,
        email: "test1@yopmail.com",
      },
      {
        name: "Employee Name2",
        password: "testpass",
        role: EMPLOYEE_ROLES.ADMIN,
        email: "test2@yopmail.com",
      },
      {
        name: "Employee Name3",
        password: "testpass",
        role: EMPLOYEE_ROLES.ADMIN,
        email: "test3@yopmail.com",
      },
    ];

    for (const employee of VALID_EMPLOYEES) {
      await addNewEmoloyee(employee);
    }

    let employees = await findEmployees();

    employees.forEach((employee) => {
      expect(employee).toBeInstanceOf(EmployeeModel);
    });
    expect(employees.length).toBe(VALID_EMPLOYEES.length);
  });

  it("should find spesific employees by ids", async () => {
    const VALID_EMPLOYEES = [
      {
        name: "Employee Name1",
        password: "testpass",
        role: EMPLOYEE_ROLES.ADMIN,
        email: "test1@yopmail.com",
      },
      {
        name: "Employee Name2",
        password: "testpass",
        role: EMPLOYEE_ROLES.ADMIN,
        email: "test2@yopmail.com",
      },
      {
        name: "Employee Name3",
        password: "testpass",
        role: EMPLOYEE_ROLES.ADMIN,
        email: "test3@yopmail.com",
      },
    ];

    let createdEmployeeIds: string[] = [];

    for (const employee of VALID_EMPLOYEES) {
      const createdEmployee = await addNewEmoloyee(employee);
      createdEmployeeIds.push(createdEmployee._id.toString());
    }

    let employees = await findEmployees([
      createdEmployeeIds[0],
      createdEmployeeIds[1],
    ]);

    employees.forEach((employee) => {
      expect(employee).toBeInstanceOf(EmployeeModel);
      expect(createdEmployeeIds).toContain(employee._id.toString());
    });

    expect(employees.length).toBe(2);
  });

  it("should find employee by email ", async () => {
    const VALID_EMPLOYEE = {
      name: "Employee Name",
      password: "test",
      role: EMPLOYEE_ROLES.ADMIN,
      email: "test@yopmail.com",
    };

    await addNewEmoloyee(VALID_EMPLOYEE);
    const employee = await findEmployeeByEmail(VALID_EMPLOYEE.email);
    expect(employee).toBeDefined();

    expect(employee?.email).toEqual(VALID_EMPLOYEE.email);
  });

  it("should update some employee informations", async () => {
    const VALID_EMPLOYEE = {
      name: "Employee Name",
      password: "test",
      role: EMPLOYEE_ROLES.ADMIN,
      email: "test@yopmail.com",
    };

    const newEmployee = await addNewEmoloyee(VALID_EMPLOYEE);

    const updatedUser = await updateEmployeeById(newEmployee._id.toString(), {
      ...VALID_EMPLOYEE,
      name: "Employee Name 2",
      role: EMPLOYEE_ROLES.EDITOR,
    });

    expect(updatedUser?.name).toBe("Employee Name 2");
    expect(updatedUser?.role).toBe(EMPLOYEE_ROLES.EDITOR);
  });

  it("should delete user", async () => {
    const VALID_EMPLOYEE = {
      name: "Employee Name",
      password: "test",
      role: EMPLOYEE_ROLES.ADMIN,
      email: "test@yopmail.com",
    };

    const newEmployee = await addNewEmoloyee(VALID_EMPLOYEE);

    const deletedUser = await deleteEmployeeById(
      newEmployee?._id?.toString() || ""
    );

    expect(deletedUser).toBeDefined();
    expect(deletedUser).toBeInstanceOf(EmployeeModel);
    expect(deletedUser?._id).toEqual(newEmployee._id);
  });
});
