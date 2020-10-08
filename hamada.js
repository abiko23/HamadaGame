/*
	marioクラス
*/
function cMario(){	
	// 変数(座標)
	this.PosX;					// x座標
	this.PosY;					// y座標
	this.GroundPosY;			// 地面座標
	this.AddNumY;				// yの加算量
	this.AddNumX;				// x座標移動加算量
	this.Dir;					// 向いている方向
	this.AnimX;					// アニメーションX
	this.AnimCnt;				// アニメーションカウント
	this.DashCnt;				// ダッシュさせるまでの時間
	this.DashState;				// 移動状態
	this.bJump;					// ジャンプフラグ
	this.JumpCnt;				// ジャンプカウンター
}

/*
	初期化関数
*/
cMario.prototype.Init = function(x,y){
	this.PosX = x;
	this.PosY = y;
	this.AddNumY = 0;			// y加算量
	this.GroundPosY = 416;		// 地面座標
	this.Dir = RIGHT_DIR;
	this.AddNumX = 2;
	this.AnimX = 0;
	this.AnimCnt = 0;			// アニメーションカウント
	this.DashCnt = 0;			// ダッシュさせるまでの時間
	this.DashState = WALK;		// 移動状態
	this.bJump = false;			// ジャンプフラグ
	this.JumpCnt = 0;				// ジャンプカウンター
}
/*
	動き
*/
cMario.prototype.Move = function(bRight,bLeft,bSpace,bJump){
	
	// 右キーが押された
	if(bRight)
	{
		// ダッシュボタンが押されている
		if(bSpace)
		{
			this.DashState = DASH;
			this.AddNumX = 4;
			this.AnimX = 64;		// ダッシュ用のアニメ
			// 何回でアニメーションを変えるか
			if(this.AnimCnt++ >= ANIM_CHANGE - 1)
	 		{
				if(this.AnimX == 64)
				{	
					this.AnimX = 96;	// 次のコマへ
				}
				else
				{
					this.AnimX = 64;
				}
				this.AnimCnt = 0;
			}
		}
		else
		{
			this.AddNumX = 2;
			// 何回でアニメーションを変えるか
			if(this.AnimCnt++ >= ANIM_CHANGE)
			{
				if(this.AnimX == 0)
				{	
					this.AnimX = 32;	// 次のコマへ
				}
				else
				{
					this.AnimX = 0;
				}
				this.AnimCnt = 0;
			}
		}
		this.Dir = RIGHT_DIR;
		this.PosX += this.AddNumX;
	}
	// 左キーが押された
	else if(bLeft)
	{
		// ダッシュボタンが押されている
		if(bSpace)
		{
			this.DashState = DASH;
			this.AddNumX = 4;
			this.AnimX = 64;		// ダッシュ用のアニメ
			// 何回でアニメーションを変えるか
			if(this.AnimCnt++ >= ANIM_CHANGE - 1)
			{
				if(this.AnimX == 64)
				{	
					this.AnimX = 96;	// 次のコマへ
				}
				else
				{
					this.AnimX = 64;
				}
				this.AnimCnt = 0;
			}
		}
		else
		{
			this.AddNumX = 2;
			// 何回でアニメーションを変えるか
			if(this.AnimCnt++ >= ANIM_CHANGE)
			{
				if(this.AnimX == 0)
				{	
					this.AnimX = 32;	// 次のコマへ
				}
				else
				{
					this.AnimX = 0;
				}
				this.AnimCnt = 0;
			}
		}
		this.Dir = LEFT_DIR;
		this.PosX -= this.AddNumX;
	}
	
	// ジャンプ
	if(bJump)
	{
		// ジャンプフラグ
		if(!this.bJump)
		{
			this.bJump = true;
			// ダッシュ中はジャンプ力を上げる
			if(bSpace) this.AddNumY = 18;		// ジャンプさせる
			else this.AddNumY = 16;		// ジャンプさせる
		}
	}
	
	// ジャンプアクション
	if(this.bJump)
	{
		// ジャンプ時のアニメーション
		if(bSpace)this.AnimX = 160;
		else this.AnimX = 128;
		this.PosY -= this.AddNumY;		// 上昇
		// タイマーをかける
		if(this.JumpCnt++ % 2 == 0)
		{
			this.AddNumY -= 2;
			// 最大落下速度
			if(this.AddNumY < -MAX_GRAVITY)
			{
				this.AddNumY = -MAX_GRAVITY;
			}
		}
		// 地面とされる位置についた
		if(this.PosY >= this.GroundPosY)
		{
			this.AddNumY = 0;
			this.PosY = this.GroundPosY;
			this.bJump = false;
			this.AnimX = 0;		// アニメーション通常
		}
	}
}
