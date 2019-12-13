export function day() {
    let todayStartTime = new Date(new Date().toLocaleDateString()).getTime();
    let todayEndTime = todayStartTime + 24 * 60 * 60 * 1000 - 1;
    console.log(todayStartTime)
    console.log(todayEndTime)
    return {start:todayStartTime,end:todayEndTime}
}
