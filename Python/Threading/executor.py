import logging
from concurrent.futures import ThreadPoolExecutor
import time

def thread_func(name):
    logging.info('Thread %s: starting', name)
    time.sleep(2)
    logging.info('Thread %s: finishing', name)

if __name__ == '__main__':
    format = '%(asctime)s: %(message)s'
    logging.basicConfig(format=format, level=logging.INFO, datefmt='%H:%M:%S')
    with ThreadPoolExecutor(max_workers=3) as executor:
        executor.map(thread_func, range(3))
