module.exports.init = async router => {
    let taskController = new TaskController();

    router.get("/api/tasks", taskController.list);
    router.get("/api/tasks/:id", taskController.get);
    router.post("/api/tasks", taskController.create);
    router.put("/api/tasks/:id", taskController.update);
    router.delete("/api/tasks/:id", taskController.delete);
}

var tasks = []

class TaskController {

    async list(ctx, next) {
        ctx.body = tasks
    }

    async get(ctx, next) {
        let task = await get(ctx.params.id)
        if (task) {
            return task
        }
        return "task id 不存在"
    }

    async create(ctx, next) {
        let task = ctx.request.body;
        task.id = uuid()

        await create(task)
        ctx.body = "添加成功"
    }

    async update(ctx, next) {
        ctx.body = await update(ctx.params.id, ctx.request.body)
    }

    async delete(ctx, next) {
        ctx.body = await delTask(ctx.params.id)
    }

}

async function create(task) {
    await sleep(3000)
    tasks.push(task)
}

async function get(id) {
    for (var i = 0; i < tasks.length; i++) {
        await sleep(1000)
        var task = tasks[i]
        if (task.id === id) {
            return task
        }
    }
    return null
}

async function update(id, task) {
    let savedTask = await get(id);
    if (!savedTask) {
        return "task id 不存在"
    }
    savedTask.title = task.title
    savedTask.description = task.description
    savedTask.done = task.done
    return "更新成功"
}

// 为什么用 delete(id) 会报错??
async function delTask(id) {
    let savedTask = await get(id);
    if (!savedTask) {
        return "task id 不存在"
    }
    tasks.splice(tasks.indexOf(savedTask), 1);
    return "删除成功"
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
}
