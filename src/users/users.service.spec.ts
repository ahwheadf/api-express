import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types';
import { UserService } from './user.service';
import { UserModel } from '@prisma/client';
import { User } from './user.entity';

const configServiceMock: IConfigService = {
	get: jest.fn(),
};

const usersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(configServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(usersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await userService.createUser({
			email: 'a@a.ru',
			name: 'John',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const validateUserSuccess = await userService.validateUser({
			email: 'a@a.ru',
			password: '1',
		});
		expect(validateUserSuccess).toBeTruthy();
	});

	it('validateUser - failed', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const validateUserFailed = await userService.validateUser({
			email: 'a@a.ru',
			password: '2',
		});
		expect(validateUserFailed).toBeFalsy();
	});

	it('validateUser - invalid user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const validateUserFailed = await userService.validateUser({
			email: 'a@a.ru',
			password: '1',
		});
		expect(validateUserFailed).toBeFalsy();
	});
});
