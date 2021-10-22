import logging
import threading
import time

def thread_func(name):
    logging.info('Thread %s: starting', name)
    time.sleep(2)
    logging.info('Thread %s: finishing', name)

if __name__ == '__main__':
    format = '%(asctime)s: %(message)s'
    logging.basicConfig(format=format, level=logging.INFO, datefmt='%H:%M:%S')
    
    threads = list()
    for i in range(3):
        logging.info('Main  : create and start thread %d', i)
        x = threading.Thread(target=thread_func, args=(i,))
        threads.append(x)
        x.start()
    
    for i, thread in enumerate(threads):
        logging.info('Main  : before joining thread %d', i)
        thread.join()
        logging.info('Main  : thread %d done', i)
