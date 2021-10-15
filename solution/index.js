module.exports = function (Homework) {

    return async function reduce(asyncArray, fn, initialValue, cb) {
        let result = initialValue;
        let i = 0;
    
        const lengthPromise = new Promise(resolve => {
            asyncArray.length(len => resolve(len));
        });
    
        const length = await lengthPromise;
    
        while (true) {
            const checkPromise = new Promise(resolve => {
                Homework.less(i, length, (res) => resolve(res));
            });
    
            const check = await checkPromise;
    
            if (!check) {
                break;
            }
    
            const getPromise = new Promise(resolve => {
                asyncArray.get(i, i => resolve(i));
            });
    
            const nextElement = await getPromise;
    
            const functionPromise = new Promise(resolve => {
                fn(result, nextElement, i, asyncArray, (res) => resolve(res));
            });
    
            result = await functionPromise;      
    
            const addPromise = new Promise(resolve => {
                Homework.add(i, 1, (newIndex) => resolve(newIndex));
            });
    
            const nextIndex = await addPromise;
    
            i = nextIndex;
        } 
    
        cb(result);
    };
};