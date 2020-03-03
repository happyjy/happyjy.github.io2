# 새작업
			git checkout -b EFX/dev.14760_newTab ecount/master-nol4
			git checkout -b A19_00479_EFE_noActionBtn1 ecount/master			
			
					

			git checkout -b A19_03444_EFE_browser_cache_command_2nd origin/A19_03444_ECS_3rd_2
			git checkout -b A19_03444_EFE_2_browser_cache_command_2nd origin/A19_03444_ECS_3rd_Share
			
			git checkout -b A20_00078_createGridWidget_Jyoon A20_00078_createGridWidget_Jyoon_copy
			git checkout -b A19_04066_Add_layer_function_At_FormLayout ecount/master

		# git log && git show
			git log --stat 						: 변경 파일까지
			git log -p 							: 변경 내용까지
			git show [commit SHA]				: commit head의 변경내용
			git show [commit SHA] --name-only 	: 파일 내용만
			git show [commit SHA] 				: commit SHA 의 변경내용
			git show [commit SHA] --stat 		: commit SHA의 변경 파일 list
			
		# stash
			git stash save "wirte message"
			git stash list
			git stash apply [stash@{1}]                           : stash 적용 후 stash list에서 유지
			git stash pop  [stash@{1}]  						  : stash 적용 후 stash list에서 제거
			git stash drop [git stash list의 number]
			git stash show [git stash list의 number] -p           : options -p로 인해 stash된 파일을 모두 볼 수 있다.
			git stash show [git stash list의 number] --name-only  : stash list number의 변경된 파일을 볼 수 있다.

		# 로컬/원격 브렌치 삭제 하는 방법
			https://www.it-swarm.net/ko/git/git%EC%97%90%EC%84%9C-%EB%B6%84%EA%B8%B0%EB%A5%BC-%EC%96%B8%EC%A0%9C-%EC%82%AD%EC%A0%9C%ED%95%A9%EB%8B%88%EA%B9%8C/971487373/
			* 로컬 브렌치 삭제: git branch -d yourbranch
			* 원격 브렌치 삭제: git push Origin :mybranch
			
		# git 명령어 파일로 만드는 방법
			* [git 명령어] > D:\diff1.text	: dir에 파일 생성
			
		# branch 
			* git branch -m OLD-BRANCH-NAME NEW-BRANCH-NAME	: Rename a Branch
			* git branch -m NEW-BRANCH-NAME					: Rename the Current Branch
			
			* git branch -d BRANCH-TO-DELETE				: Delete a Branch
			
		# git push origin 
			* git push origin EFX/dev.347761_improve_ecRequire
		
		# 새로 추가한 파일이 git 추적에 잡히지 않는 경우(.gitignore에 등록하지 않음에도 불구하고)
			git add [상대경로/파일명] -f
			
		# commit 취소			
			git reset --soft head^
			
		# 배포하는 방법
			* remote update 
				- git remote update || git fetch ecount || git fetch origin
			* 작업 브렌치 stage로 변경
				- git checkout -b stage
			* stage rebase
				- git rebase ecount/stage
			* push하기 
				- visual studio에서 하기 (vs code x)
				
		# remote 받는 방법
			* git pull
				- fetch && download update the local repository
			* git rebase [remote]
				git rebase ecount/master-nol4

			
			* [?]git pull --rebase === git rebase
			
		# cherry-pick
			* git cherry-pick commitSha
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      [TOC]




* git fetch && git rebase origin/master

*  git branch --unset-upstream?

* git branch -d ? git branch -D

  * 현재 적용된 local branch를 제거 할 수는 없다.

  ```
  * PS D:\ECSolution\Master\80 Contents\WebResource\Contents\js> git branch -d list
      error: The branch 'list' is not fully merged.
      If you are sure you want to delete it, run 'git branch -D list'.
  * PS D:\ECSolution\Master\80 Contents\WebResource\Contents\js> git branch -D list
  ```

  

# push 하는 단계

1. remotes > ecount에 있: fetch
   * git fetch

```
# git fech
    remote: Enumerating objects: 163, done.
  remote: Counting objects: 100% (163/163), done.
    remote: Compressing objects: 100% (99/99), done.
    remote: Total 163 (delta 87), reused 130 (delta 64)
    Receiving objects: 100% (163/163), 258.29 KiB | 14.35 MiB/s, done.
    Resolving deltas: 100% (87/87), completed with 17 local objects.
    From http://git.ecount.kr/ecount/ecsolution
       64d280dcd..d2ce0be37  master         -> ecount/master
       2ffb8a244..d2ce0be37  allzone        -> ecount/allzone
     + f28c4223c...7a311b9e6 allzone-hotfix -> ecount/allzone-hotfix  (forced update)
       8ccccd1d0..594e2d445  master-hotfix  -> ecount/master-hotfix
       61bad4e00..baef247b0  master-nol4    -> ecount/master-nol4
```

​    

2. remotes > ecount/master: 새로컬 분기시작 위치
   * git checkout -b myfeature ecount/master
3. 작업 branch -> stage로 변경하기 
   * 

3. local branch: rebase
   * rebase 받을 branch 이동 > git rebase ecount/master
   * https://git-scm.com/docs/git-rebase



# branch 

| command                                                   | explanation               | etc                       |
| --------------------------------------------------------- | ------------------------- | ------------------------- |
| git branch                                                | local branch 확인         |                           |
| git branch -a                                             | local, remote branch 확인 |                           |
| git branch -r                                             | remote branch 확인        |                           |
|                                                           |                           |                           |
| git branch <branchname>                                   | create branch             |                           |
| git branch -m <newbranch>                                 | change branch name        | 현 branch 명 변경         |
| git branch -m <oldbranch> <newbranch>                     | change branch name        | 변경할 brnach명 변경      |
| git branch -d <branchname>                                | delete branch             |                           |
|                                                           |                           |                           |
| git checkout <branchname>                                 | change branch             |                           |
| git checkout -b <branchname>                              | Create and Switch Branch  |                           |
| git checkout -b <branchname> <remoterbranchname>          | Create and Switch Branch  |                           |
|                                                           |                           |                           |
| git merge <branchname>                                    | merge branch              |                           |






# fetch, rebase

| command                                                      | 설명                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| git fetch ecount                                             | fetch remote; ecount                                         |
| git fetch origin                                             | fetch remote; origin                                         |
| git rebase ecount/stage                                      | rebase<br />현재 local branch에<br />remote branch(ecount/stage branch) |
| git checkout stage && git remote update && git rebase ecount/stage | 1. move to local branch 'stage'<br />2. fetch remote <br /><br />3. rebase from remote branch(ecount/stage) <br />to local branch; stage |



# 변경내용 취소하는 방법 

https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things

* git reset --hard 								: 모든 수정사항 되돌리기
* git checkout -- [파일경로/파일명]     : git add로 추가한것 지정한 파일명만 되돌리기
  * 파일경로/파일명: git stash로 수정된 파일 경로/파일명 copy&paste

# reset 


# git log 
    * git log -2    : 최신 2번째 까지 push 내용을 가지고 온다.
    * git log --after="2014-7-1"
    * git log --after="yesterday"
    * git log --after="2014-7-1" --before="2014-7-4"
    * git log --author="John"


    * https://www.atlassian.com/git/tutorials/git-log



## git add, git commit, git push 취소하기 

### git add 취소하기

* git reset HEAD [file]	: staging에서 취소 

  

### git commit 취소하기 

```javascript
  // [방법 1] commit을 취소하고 해당 파일들은 staged 상태로 워킹 디렉터리에 보존
  $ git reset --soft HEAD^
  // [방법 2] commit을 취소하고 해당 파일들은 unstaged 상태로 워킹 디렉터리에 보존
  $ git reset --mixed HEAD^ // 기본 옵션
  $ git reset HEAD^ // 위와 동일
  $ git reset HEAD~2 // 마지막 2개의 commit을 취소
  // [방법 3] commit을 취소하고 해당 파일들은 unstaged 상태로 워킹 디렉터리에서 삭제
  $ git reset --hard HEAD^
```

* commit message 변경하기 

  * git commit --amend

* working dir를 remote의 마지막 commit 상태로 되돌리고 싶을때 

  * git reset --hard HEAD



### git push 취소하기

1. git reset HEAD^	: 가장 최근의 commit을 취소 (기본 옵션: --mixed)

1. 원하는 시점으로 이동하기 
 * Reflog(브랜치와 HEAD가 지난 몇 달 동안에 가리켰었던 커밋) 목록 확인
     : git reflog 또는 $ git log -g
   *  원하는 시점으로 워킹 디렉터리를 되돌린다.
     : git reset HEAD@{number} 또는 $ git reset [commit id]

2. 되돌려진상태에서 COMMIT
   * git commit -m "Write commit messges"

3. 원격 저장소에 강제로 push 한다.
   * git push origin [branch name] -f
     || git push origin +[branch name]

# git stash

https://www.freecodecamp.org/news/useful-tricks-you-might-not-know-about-git-stash-e8a9490f0a1a/

* stash는 branch 구분 없이 담고, 사용가능하다.

* git stash
* git stash save "wirte message"
* git stash list
* git stash apply [stash@{1}]                        : stash 적용 후 stash list에서 유지 
* git stash pop  [stash@{1}]  						: stash 적용 후 stash list에서 제거 
* git stash drop [git stash list의 number]
* git stash show [git stash list의 number] -p                        : options -p로 인해 stash된 파일을 모두 볼 수 있다.
* git stash show [git stash list의 number] --name-only   	 : stash list number의 변경된 파일을 볼 수 있다.



# 변경된 file들만 list 

* I personally use the combination of --stat and --oneline with the show command:
	git show --stat --oneline HEAD
	git show --stat --oneline b24f5fb
	git show --stat --oneline HEAD^^..HEAD

* If you do not like/want the addition/removal stats, you can replace --stat with --name-only
	git show --name-only --oneline HEAD
	git show --name-only --oneline b24f5fb
	git show --name-only --oneline HEAD^^..HEAD

* **git show --name-only**: HEAD의 commit내용, 수정한 files

# 파일 비교 - git diff

```
# Multiline difference
	$ git diff master..branch1

# Singleline difference
	$ git diff --color-words branch1..branch2
```
- git diff-tree --no-commit-id --name-only [COMMIT ID]: COMMIT ID의 COMMIT한 FILE들	
- git diff commit1 commit2: any two commits
- git ls-files -m: list up modified files
- git diff-files
- git diff {commit1} {commit2} > diff.txt: diff.txt 파일 이름으로 생성하기
  - git diff HEAD^ HEAD > diff.txt
  - git diff <commit1> <commit2> --name-only
  - 실제 eg)
    **git diff > diff1.text		: 명령어 수행한 dir에 파일 생성**
    **git diff > D:\diff1.text	: dir에 파일 생성**



# 다른 branch에 commit 한경우 

* git reset --soft HEAD^
* git stash 
-----------------------------------
* git checkout [BRANCH NAME]
* git stash pop
* git add . 
* git commit -m '[COMMIT EXPLANATION]'
* git push 



# 롤백 할때 

* commit 이후에 rollback process
* 작업 내용을 모두 제거 
git reset --soft HEAD^
(working dir에서 제거[변경내용을 제거 해야 하는 경우]: git reset --hard HEAD^)
* stage에 있는 파일을 stash에 보관
git stash save "this is commit version"

* git add .
git commit -m 'wirte message'



# [?]분기 푸쉬



# 배포 프로그램에 등록할때 

* commit한 파일 기준으로 배포 프로그램에 등록된다.

# git 취소하기 

* https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html





# branch

참고 : https://backlog.com/git-tutorial/kr/reference/branch.html
아래 내용 : https://stackoverflow.com/questions/4470523/create-a-branch-in-git-from-another-branch

``` text

* Create a Branch
	- Create branch when master branch is checked out. Here commits in master will be synced to the branch you created.
	$ git branch branch1

	- Create branch when branch1 is checked out . Here commits in branch1 will be synced to branch2
	$ git branch branch2

* Checkout a Branch
    git checkout command switch branches or restore working tree files
    $ git checkout branchname

* Renaming a Branch
	$ git branch -m branch1 newbranchname

* Delete a Branch
    $ git branch -d branch-to-delete
    $ git branch -D branch-to-delete ( force deletion without checking the merged status )


* Create and Switch Branch
    $ git checkout -b branchname
    -b 옵션을 붙이면, 브랜치의 작성과 작성한 브랜치로의 전환을 명령어로 실행 할 수 있습니다.

* Branches that are completely included
    $ git branch --merged


************************** Branch Differences [ git diff branch1..branch2 ] ************************
    Multiline difference
    $ git diff master..branch1
    Singleline difference
    $ git diff --color-words branch1..branch2
```

# 커밋 로그 조작
https://backlog.com/git-tutorial/kr/reference/log.html

## 이전에 작성한 커밋 수정
* git commit --amend

## 과거 커밋의 내용을 수정
* git rebase -i <commit sha>
    * 지정한 커밋보다 이후의 커밋을 지정하면, 커밋의 목록이 표시됩니다. 그 중에서 코멘트을 수정하려고 하는 커밋을 찾아 그 행 pick 문자를 edit로 변경하고 저장 · 종료합니다.
    * 다음 --amend 옵션을 지정하여 커밋을 실행합니다. 코멘트 입력 화면이 표시되므로 코멘트를 수정합니다.
* git commit --amend
    * 마지막으로 --continue옵션을 지정하여 rebase를 실행합니다.
* git rebase --continue


# 커밋 이력 편집하기 
    * https://backlog.com/git-tutorial/kr/stepup/stepup6_5.html
    * A -> B -> C -> D
        => A -> B + C -> D


# terminal 화면 이동 hot key 
```
j, e, arrow down: 한줄씩 아래로 이동
k, arrow up: 한줄씩 위로 이동

p: 맨위로 이동

u: terminal 창 기준 반씩 위로 이동
d: terminal 창 기준 반씩 아래로 이동

b: terminal 창 기준 한장씩 위로 이동
f, z: terminal 창 기준 한장씩 아래로 이동
```

# Powershell

* folder 여는 방법 

  ```bsh
  start .
  start c:\
  ```



# command 결과 파일로 생성하기 

git any command "> dir.filename.file.filename extension" 

* 예
  * **git diff > diff1.text		: 명령어 수행한 dir에 파일 생성**
    **git diff > D:\diff1.text	: dir에 파일 생성**
