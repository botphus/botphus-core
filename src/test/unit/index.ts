import data from './data';
import dom from './dom';
import event from './event';
import page from './page';
import time from './time';

export default function() {
    describe('Unit', () => {
        dom();
        event();
        time();
        page();
        data();
    });
}
