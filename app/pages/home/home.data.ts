import { ResourceInterface } from "../../components/model/resourse.interface";

export const resourceDataset: ResourceInterface[] = [
    {
        resourceCode: "RES001",
        name: "Hospital Central",
        description: "Main city hospital equipped with a 24/7 emergency room, intensive care units, and advanced trauma facilities. Security is provided by on-site guards and surveillance cameras. Supplies include medical equipment, pharmaceuticals, first aid kits, and emergency food and water.",
        latitude: -23.55052,
        longitude: -46.633308,
        capacity: 200,
    },
    {
        resourceCode: "RES002",
        name: "Fire Station 1",
        description: "Primary fire station serving the downtown area, staffed by trained firefighters and equipped with modern fire engines and rescue tools. The facility is secured with restricted access and monitored entry points. Supplies include firefighting gear, rescue equipment, emergency medical kits, and backup power generators.",
        latitude: -23.55123,
        longitude: -46.634567,
        capacity: 50,
    },
    {
        resourceCode: "RES003",
        name: "Community Shelter",
        description: "Emergency shelter designed for natural disasters and large-scale emergencies, offering safe accommodation, basic medical care, and food distribution. Security personnel are present at all times, and the shelter is equipped with surveillance systems. Supplies include blankets, non-perishable food, bottled water, hygiene kits, and basic medicines.",
        latitude: -23.55234,
        longitude: -46.635789,
        capacity: 100,
    },
    {
        resourceCode: "RES004",
        name: "Police Station Central",
        description: "Central police station responsible for public safety, emergency response, and law enforcement. The building is highly secured with controlled access, armed officers, and surveillance cameras. Supplies include communication equipment, protective gear, first aid kits, and emergency rations.",
        latitude: -23.55345,
        longitude: -46.636890,
        capacity: 80,
    },
];
