import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { UsersService } from "src/users/users.service";
import { CreateConfigDto } from "./dto/create-config.dto";
import { UpdateConfigDto } from "./dto/update-config.dto";
import spawnAsync from "@expo/spawn-async";

@Injectable()
export class ConfigService {
    constructor(usersService: UsersService) {}

    create(createConfigDto: CreateConfigDto) {
        return "This action adds a new config";
    }

    findAll() {
        return `This action returns all config`;
    }

    findOne(id: number) {
        return `This action returns a #${id} config`;
    }

    update(id: number, updateConfigDto: UpdateConfigDto) {
        return `This action updates a #${id} config`;
    }

    remove(id: number) {
        return `This action removes a #${id} config`;
    }

    @Interval(5000)
    async getNetwork() {
        try {
            let getNetwork$ = spawnAsync("python3", [
                "main.py",
                process.env.SEARCH_RANGE,
            ]);
            const result = await getNetwork$;
            console.log(new Date());

            let obj: {
                IP: string;
                MAC: string;
            }[] = [];

            let str = result.stdout.split("\n");
            for (let i = 0; i < str.length; i++) {
                const splited = str[i].split("\t");
                obj = [
                    ...obj,
                    {
                        IP: splited[0],
                        MAC: splited[1],
                    },
                ];
            }
            console.dir(obj, { maxArrayLength: null, maxStringLength: null });
        } catch (err) {
            console.error(err);
        }
    }
}
