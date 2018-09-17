import createTask from './create';
import removeTask from './remove';

export default function() {
    describe('Task', () => {
        createTask();
        removeTask();
    });
}
