Однажды мне понадобилось скомпилировать исходный код Rust в .exe-исполняемый файл. Программа разрабатывалась на MacOS и в конечном итоге достигла своего логического завершения. Однако некоторое время спустя появилось новое техническое требование - скомпилировать программу для Windows x86_64.  
[Решение](https://gist.github.com/Mefistophell/9787e1b6d2d9441c16d2ac79d6a505e6)

Было бы проще, вероятно, собрать программу на Windows, однако такой путь несопоставим с эволюцией программирования; нам следует решать проблему, а не искать обходные пути.

### Описание

**Шаг 1**  
Чтобы скомпилировать исходный код для платформы отличной от той, на которой вы разрабатываете программу необходимо задать опцию **target**.

Команда `> rustup target list` выводит список всех доступных значений для этой опции.

Задать **target** можно при запуске компилятора, а можно используя файл конфигурации. \[[Подробно про конфигурацию](https://doc.rust-lang.org/cargo/reference/config.html)\]

В нашем случае предполагается, что файл конфигурации находится в `.cargo/config` относительно корня проекта. Для компиляции под Windows x86_64 мы должны указать следующие инструкции:

    [target.x86_64-pc-windows-gnu]
     linker = "x86_64-w64-mingw32-gcc"

Теперь нам необходим этот самый `86_64-pc-windows-gnu`  
Это так называемый GNU Compiler Collection — набор компиляторов для различных языков программирования. Нам следует установить его в систему, а затем добавить в **Rust toolchain.**

> *Toolchain - это набор связанных инструментов необходимых для компиляции и генерации выполняемого кода из исходных текстов.*

Так же мы должны указать компоновщик - `linker`

Компилятор **Rust** последовательно просматривает каждый файл исходного кода и проверяет его на соответствие правилам языка **Rust.** Затем он преобразовывает исходный код в файл машинного языка, называемый объектным файлом.

После того, как компилятор создает один или несколько объектных файлов, другая программа, называемая **компоновщиком**, берет все объектные файлы, сгенерированные компилятором, и объединяет их в одну исполняемую программу. Помимо возможности связывать объектные файлы, компоновщик также может связывать файлы библиотек. Файл библиотеки представляет собой набор предварительно скомпилированного кода, который был «упакован» для повторного использования в других программах.

**Шаг 2**  
Самое время установить соответствующий GCC, коллекцию компиляторов GNU для Windows. Как этот [Mingw-W64](https://formulae.brew.sh/formula/mingw-w64).

Я буду устанавливать через **Homebrew.**  
`> brew install mingw-w64`

**Шаг 3**  
Теперь можно добавить **target** в **toolchain**.  
`> rustup target add x86_64-pc-windows-gnu`

Все готово, можно пробовать запустить компиляцию:  
`> cargo build --target=x86_64-pc-windows-gnu --verbose`

Troubleshooting!  
Если компиляция не удалась, как это было у меня из-за всевозможных попыток выработать решение, то можно попробовать следующее:

    > cp -f /usr/local/Cellar/mingw-w64/7.0.0_1/toolchain-x86_64/x86_64-w64-mingw32/lib/{,dll}crt2.o `rustc --print sysroot`/lib/rustlib/x86_64-pc-windows-gnu/lib

Ссылки:

- [Оригинал решения на английском](https://gist.github.com/Mefistophell/9787e1b6d2d9441c16d2ac79d6a505e6)
- [Download mingw-w64 via Homebrew](https://formulae.brew.sh/formula/mingw-w64)
- [Cargo configuration](https://doc.rust-lang.org/cargo/reference/config.html)
- [Introduction to the compiler, linker, and libraries](https://www.learncpp.com/cpp-tutorial/introduction-to-the-compiler-linker-and-libraries/)
- [Github issue: Can't cross compile from Linux to Windows](https://github.com/rust-lang/rust/issues/32859)
- [Github issue: Cannot link with C code using stdout](https://github.com/rust-lang/rust/issues/47048)
- [Rust Toolchains](https://medium.com/@nsdchrisu/rust-is-distributed-on-a-stable-nightly-and-beta-release-channels-5ebf18126c0d)
