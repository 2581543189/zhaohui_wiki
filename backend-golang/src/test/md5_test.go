package test

import (
	"crypto/md5"
	"fmt"
)

func ExampleMd5() {
	origin := "zhaohui"
	h := md5.New()
	h.Write([]byte(origin))
	sum := h.Sum(nil)
	fmt.Println(origin)
	fmt.Println(string(sum))

	// Output:
	// zhaohui
	// �زഀ�~�%��i�l
}
