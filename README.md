# 361-proj
rental seeking application

Forking Repository
1.	Make sure you’re logged into GitHub with your account.
2.	Go to this repository [https://github.com/jherrick/361-proj]
3.	Click the Fork button on the upper right-hand side of the repository’s page.

Making a Local Clone
1.	Navigate to your newly forked repository (on your github account)
2.	Copy the URL
3.	In your desired directory type git clone [url-that-you-just-copied]

Adding a Remote
1.	In same directory you just put your local clone in
2.	Add a git remote pointing back to original repository by typing git remote add https://github.com/jherrick/361-proj

Keep your Fork in Sync
1.	Pull changes from original repo with git pull upstream master
2.	Push these changes to YOUR forked repo with git push origin master

Optional (Safe) Feature Branch Method
1.	In directory type git checkout -b [new-branch-name]
2.	Write your code
3.	Push changes in branch back to github by typing git push origin [new-branch-name]

Create a Pull Request to merge your code with main repository
1.  Go to MAIN repository and click “Pull Request” and follow Instructions.
2.  [OPTIONAL]  If you used a branch make sure your pull request is sourcing from your feature branch NOT your master

Post-Pull Request Cleanup
1.	If you used a branch, delete it with git branch -d [branch-name]
2.	Update master in your forked repo with git push origin master
3.	If you used a branch, push deletion of feature branch to your github repo with git push --delete origin [branch-name]
