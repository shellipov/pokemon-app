import {useRefAnimated} from "@/hooks/useRefAnimated";

export function animatedList(length: number) {
    const list = []
    for (let i = 1; i < length; i++) {
        list.push(useRefAnimated());
    }
    return list;
}
