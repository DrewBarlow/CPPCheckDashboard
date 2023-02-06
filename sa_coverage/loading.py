from itertools import cycle
from threading import Thread
from time import sleep
from typing import Any, Generator, Tuple

class LoadingIcon:
    def __init__(self, text: str, /, delay: float=0.2) -> None:
        self._generator: Generator[str, None, None] = cycle("/-\\|")
        self._text: str = text
        self._is_loading: bool = False
        self._delay: float = 0.2

    def __enter__(self) -> None:
        self._is_loading = True
        Thread(target=self._animate_icon).start()
        return

    def __exit__(self, *args: Tuple[Any]) -> None:
        self._is_loading = False
        print(f"{self._text} {next(self._generator)} Done!")
        return

    def _animate_icon(self) ->  None:
        while self._is_loading:
            print(f"{self._text} {next(self._generator)}", end='\r')
            sleep(self._delay)
            print('\b', end="")

        return

